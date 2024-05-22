import Category from "../models/Category.model.js";
import {CustomError} from "../middlewares/errorHandler.middleware.js";
import mongoose from "mongoose";
import slugify from "slugify";
import {v4 as uuid} from "uuid";
import {generateCategoryTree} from "../utils/category.utils.js";

export const getAllCategories = async (req, res) => {
    const {page = 1, limit = 1000, search = '', sortBy = '', order = 'asc'} = req.query;

    try {
        const pipeline = [];

        if (search && search.length > 0) {
            pipeline.push({
                $match: {
                    $or: [
                        {title: {$regex: new RegExp(search, 'i')}},
                        {description: {$regex: new RegExp(search, 'i')}},
                    ],
                },
            });
        }

        if (sortBy && sortBy.length > 0) {
            pipeline.push({
                $sort: {
                    [sortBy]: order === 'asc' ? 1 : -1,
                },
            });
        }

        if (page && limit) {
            pipeline.push({
                $skip: (Number(page) - 1) * Number(limit),
            });
            pipeline.push({
                $limit: Number(limit),
            });
        }

        pipeline.push({
            $lookup: {
                from: 'categories',
                localField: 'parent',
                foreignField: '_id',
                as: 'parent',
            },
        });

        pipeline.push({
            $addFields: {
                parent: {$arrayElemAt: ['$parentArray', 0]},
            },
        });

        pipeline.push({
            $project: {
                parentArray: 0,
            },
        });

        if (pipeline.length === 0) {
            const categories = await Category.find();
            return res.status(200).json({message: 'Categories fetched successfully!', categories});
        }

        const categories = await Category.aggregate(pipeline);
        const count = await Category.countDocuments();

        res.status(200).json({
            categories,
            meta: {
                page: parseInt(page),
                limit: parseInt(limit),
                totalPage: Math.ceil(count / limit),
                total: count,
            },
            message: 'Categories fetched successfully!'
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getCategoryById = async (req, res) => {
    const {categoryID} = req.params;
    try {
        const category = await Category.findById(categoryID);

        if (!category) throw new CustomError('Category not found!', 404);

        res.status(200).json({message: 'Category fetched successfully!', category});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getCategoriesAsTree = async (req, res) => {
    try {
        const categories = await Category.find();
        const categoryTree = generateCategoryTree(categories);

        res.status(200).json({message: 'Categories fetched successfully!', category: categoryTree});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createCategory = async (req, res) => {
    const {title, description, status, coverImage, parent} = req.body;
    const slug = slugify(title);

    try {
        if (!title) throw new CustomError('Title is required!', 400);

        if (parent && !mongoose.Types.ObjectId.isValid(parent)) {
            throw new CustomError('Invalid parent category!', 400);

            const parentCategory = await Category.findById(parent);
            if (!parentCategory) throw new CustomError('Parent category not found!', 404);
        }

        const category = new Category({
            title,
            description,
            slug: `${slug}-${uuid().slice(0, 4)}`,
            status,
            coverImage,
            parent: parent ? parent : null,
        });

        const savedCategory = await category.save();

        if (!savedCategory) {
            throw new CustomError('Category could not be created!', 500);
        }

        const populated = await savedCategory.populate('parent');

        res.status(201).json({message: 'Category created successfully!', category: populated});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateCategory = async (req, res) => {
    const {title, description, status, coverImage, parent} = req.body;
    const {categoryID} = req.params;
    try {
        if (!title) throw new CustomError('Title is required!', 400);

        const category = await Category.findById(categoryID);

        if (!category) throw new CustomError('Category not found!', 404);

        let slug
        if (title !== category.title) {
            slug = slugify(title);
        }

        if (parent && !mongoose.Types.ObjectId.isValid(parent)) {
            throw new CustomError('Invalid parent category!', 400);
        }

        const parentCategory = parent ? await Category.findById(parent) : null;
        if (parent && !parentCategory) throw new CustomError('Parent category not found!', 404);

        const updateData = {
            title,
            description: description ? description : category.description,
            slug: slug ? `${slug}-${uuid().slice(0, 4)}` : category.slug,
            status: status ? status : category.status,
            coverImage: coverImage ? coverImage : category.coverImage,
            parent: parent ? parent : category.parent,
        };

        const updatedCategory = await Category.findByIdAndUpdate(categoryID, updateData, {new: true}).populate('parent');

        if (!updatedCategory) throw new CustomError('Category could not be updated!', 400);

        res.status(200).json({message: 'Category updated successfully!', category: updatedCategory});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteCategory = async (req, res) => {
    const {categoryID} = req.params;
    try {
        const category = await Category.findById(categoryID);
        if (!category) throw new CustomError('Category not found!', 404);

        const childCategories = await Category.find({parent: categoryID});

        const promises = childCategories.map(child => {
            return Category.findByIdAndUpdate(child._id, {parent: null}, {new: true});
        })

        await Promise.all(promises);

        await Category.findByIdAndDelete(categoryID);

        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}