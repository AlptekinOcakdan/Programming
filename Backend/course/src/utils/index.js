import mongoose from "mongoose";

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