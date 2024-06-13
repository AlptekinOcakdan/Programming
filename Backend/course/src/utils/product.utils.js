import mongoose from "mongoose";
import Category from "../models/Category.model.js";
import Product from "../models/Product.model.js";
import {isObjectId} from "./index.js";

export const parseQueryParams = (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 1000;
    const sortField = query.sortField || 'price';
    const sortOrder = query.sortOrder === 'asc' ? 1 : -1;

    return { page, limit, sortField, sortOrder };
};

export const fetchAllSubCategories = async (categoryId) => {
    let categories = [new mongoose.Types.ObjectId(categoryId)];
    const directSubCategories = await Category.find({ parent: { $in: categories } });

    while (directSubCategories.length) {
        const subCategoryIds = directSubCategories.map(cat => cat._id);
        categories = [...categories, ...subCategoryIds];
        const nestedSubCategories = await Category.find({ parent: { $in: subCategoryIds } });
        directSubCategories.length = 0;
        if (nestedSubCategories.length) {
            directSubCategories.push(...nestedSubCategories);
        }
    }

    return categories;
}

export const fetchProductByIdentifier = async (identifier) =>{
    const isSlug = isObjectId(identifier);
    return isSlug ? await Product.findById(identifier) : await Product.findOne({slug: identifier});
};