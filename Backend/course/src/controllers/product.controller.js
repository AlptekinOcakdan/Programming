import {fetchAllSubCategories, parseQueryParams} from "../utils/product.utils.js";
import Product from "../models/Product.model.js";
import mongoose from "mongoose";
import Category from "../models/Category.model.js";
import slugify from "slugify";
import {v4 as uuid} from "uuid";
import {requiredParams} from "../utils/index.js";

export const getAllProducts = async (req, res) => {
    try{
        const {search = '', category} = req.query;
        const {page, limit, sortField, sortOrder} = parseQueryParams(req.query);
        
        const searchRegex = new RegExp(search, 'i');
        const matchConditions = {
            title: {$regex: searchRegex}
        };
        
        if(category) {
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
            {$unwind : {path: '$category', preserveNullAndEmptyArrays: true}},
            {$project: {categoryArray: 0}}
        ];
        
        const products = await Product.aggregate(pipeline);
        const count = await Product.countDocuments(matchConditions);
        
        res.status(200).json({
            products, 
            meta:{
                page,
                totalPage: Math.ceil(count / limit),
                limit,
                total: count
            }
        });
    }catch(error) {
        res.status(500).json({message: error.message});
    }
}

export const createProduct = async (req, res) => {
    const {title, price, description, images, discount, stock, category, status} = req.body;
    
    const params = [title, price, description, stock, category];
    // const missingParams = requiredParams(params);
    if (!title){
        return res.status(400).json({message: 'Title is required'});
    }
    
    if(category && !mongoose.Types.ObjectId.isValid(category)){
        return res.status(400).json({message: 'Invalid category id'});        
    }
    
    const productCategory = await Category.findById(category);
    if (!productCategory){
        return res.status(404).json({message: 'Category not found'});
    }
    
    try{
        const slug = slugify(title, {lower: true})+ `-${uuid().slice(0,4)}`;
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
        
        res.status(201).json({
            message: 'Product created successfully',
            product
        });
    }catch(error) {
        res.status(500).json({message: error.message});
    }
}