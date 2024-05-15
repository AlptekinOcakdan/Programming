import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, RESET_PASSWORD_SECRET} from "../constants/environmet.js";

export const hashPassword= async (password)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const comparePassword= async (password, hash)=>{
    return await bcrypt.compare(password, hash);
}

export const generateJWTToken = (payload)=>{
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '2h'});
}

export const verifyJWTToken = (token)=>{
    try {
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    } catch (error) {
        return error;
    }
}

export const generateRefreshToken = (payload)=>{
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
}

export const verifyRefreshToken = (token)=>{
    try {
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    } catch (error) {
        return error;
    }
}

export const generatePasswordResetToken = (payload)=>{
    return jwt.sign(payload, RESET_PASSWORD_SECRET, {expiresIn: '1h'});
}

export const verifyPasswordResetToken = (token)=>{
    try {
        return jwt.verify(token, RESET_PASSWORD_SECRET);
    } catch (error) {
        return error;
    }
}



