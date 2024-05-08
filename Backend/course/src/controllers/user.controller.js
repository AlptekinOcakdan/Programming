import User from '../models/User.model.js';
import {CustomError} from "../middlewares/errorHandler.middleware.js";
import {hashPassword} from "../utils/auth.utils.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users && users.length === 0) {
            throw new CustomError('No users found', 404);
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new CustomError('User not found', 404);
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const createUser = async (req, res) => {
    const {password} = req.body;
    try {
        req.body.password = await hashPassword(password);
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {password}=req.body;
    try {
        const user = await User.findById(id);
        req.body.password = await hashPassword(password);
        if (!user) {
            throw new CustomError('User not found', 404);
        }
        await User.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const deleteUser = async (req, res) => {
    const {UserId} = req.params;
    try {
        const user = await User.findById(UserId);
        if (!user) {
            throw new CustomError('User not found', 404);
        }
        await User.findByIdAndDelete(UserId);
        res.status(204);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};