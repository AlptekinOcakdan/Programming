import {fetchAllSubCategories, fetchProductByIdentifier, parseQueryParams} from "../utils/product.utils.js";
import Product from "../models/Product.model.js";
import mongoose from "mongoose";
import Category from "../models/Category.model.js";
import {createSlug, handleServerError, requiredParams} from "../utils/index.js";
import {CustomError} from "../middlewares/errorHandler.middleware.js";

export const getAllProducts = async (req, res) => {
    try {
        const {search = '', category} = req.query;
        const {page, limit, sortField, sortOrder} = parseQueryParams(req.query);

        const searchRegex = new RegExp(search, 'i');
        const matchConditions = {
            title: {$regex: searchRegex}
        };

        if (category) {
            const categoryIds = await fetchAllSubCategories(category);
            matchConditions.category = {$in: categoryIds};
        }

        const pipeline = [
            {$match: matchConditions},
            {$sort: {[sortField]: sortOrder}},
            {$skip: (page - 1) * limit},
            {$limit: limit},
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {$unwind: {path: '$category', preserveNullAndEmptyArrays: true}},
            {$project: {categoryArray: 0}}
        ];

        const products = await Product.aggregate(pipeline);
        if (!products.length>0) {
            throw new CustomError('No products found', 404);
        }
        const count = await Product.countDocuments(matchConditions);

        res.status(200).json({
            products,
            meta: {
                page,
                totalPage: Math.ceil(count / limit),
                limit,
                total: count
            }
        });
    } catch (error) {
        handleServerError(res, error);
    }
}

export const getProductByIdentifier = async (req, res) => {
    const identifier = req.params.identifier.replace(/\s+/g, '');
    try {
        const product = await fetchProductByIdentifier(identifier);
        if (!product) {
            throw new CustomError('Product not found', 404);
        }

        res.status(200).json({product});
    } catch (error) {
        handleServerError(res, error);
    }
}

export const getRelatedProducts = async (req, res) => {
    const identifier = req.params.identifier.replace(/\s+/g, '');
    try {
        const product = await fetchProductByIdentifier(identifier);
        if (!product) {
            throw new CustomError('Product not found', 404);
        }

        const relatedProducts = await Product.aggregate([
            {
                $match: {
                    _id: {$ne: product._id},
                    category: product.category._id,
                }
            },
            {$sample: {size: 20}}
        ]);
        
        res.status(200).json({relatedProducts});
    } catch (error) {
        handleServerError(res, error);
    }
}

export const createProduct = async (req, res) => {
    const {title, price, description, images, discount, stock, category, status} = req.body;

    const params = [title, price, description, stock, category];
    const missingParams = requiredParams(params);
    if (missingParams && missingParams.length > 0) {
        throw new CustomError(`Missing required fields: ${missingParams}`, 400)
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
        throw new CustomError('Invalid category id', 400);
    }

    const productCategory = await Category.findById(category);
    if (!productCategory) {
        throw new CustomError('Category not found', 404);
    }

    try {
        const slug = createSlug(title);
        const product = new Product({
            title,
            slug,
            price,
            description,
            images,
            discount,
            stock,
            category,
            status,
        });

        await product.save();

        return res.status(201).json({
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        handleServerError(res, error);
    }
}

export const updateProduct = async (req, res) =>{
    const {productId} = req.params;
    const updatableFields = ['title', 'price', 'description', 'images', 'discount', 'stock', 'category', 'status'];
    try{
        const updates = Object.keys(req.body);
        const isValidOperation = updates.every(update => updatableFields.includes(update));
        if (!isValidOperation) {
            throw new CustomError('Invalid update keys', 400);
        }
        
        const product = await Product.findById(productId);
        if (!product) {
            throw new CustomError('Product not found', 404);
        }

        product.slug = createSlug(req.body.title);
        
        updates.forEach(update => product[update] = req.body[update]);
        
        await product.save();
        
        const updatedProduct = await product.populate('category','name');
        
        res.status(200).json({message: 'Product updated successfully', updatedProduct});
    }catch(error) {
        handleServerError(res, error);
    }
}

export const deleteProduct = async (req, res) => {
    const {productId} = req.params;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new CustomError('Product not found', 404);
        }

        await Product.findByIdAndDelete(productId);
        res.status(204).send();
    } catch (error) {
        handleServerError(res, error);
    }
}