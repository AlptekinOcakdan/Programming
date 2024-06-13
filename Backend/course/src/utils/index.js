import mongoose from "mongoose";
import slugify from "slugify";
import {v4 as uuid} from "uuid";

const ObjectId = mongoose.Types.ObjectId;

export const requiredParams = (params) => {
    const missingParams = [];
    for (const key in params) {
        if (params[key] === undefined || params[key] === null || params[key] === '') {
            missingParams.push(key);
        }
    }
    return missingParams.length > 0 ? missingParams.join(', ') : false;
};

export const isObjectId = (identifier) => {
    return ObjectId.isValid(identifier) && new ObjectId(identifier).toString() === identifier;
}

export const handleServerError = (res, error) => {
    res.status(500).json({message: error.message});
}

export const createSlug = (title) => {
    return slugify(title, {lower: true}) + `-${uuid().slice(0, 4)}`;
}

