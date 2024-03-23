import User from '../models/User.model.js';
import {generateJWTToken, hashPassword} from "../utils/auth.utils.js";

export const register = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    
    try {
        const isUserExist = await User.findOne({email});
        
        if(isUserExist) {
            return res.status(400).json(
                {
                    message: "User already exist",
                    success:false
                }
            );
        }
        
        const passwordMatch = password === confirmPassword;
        if (!passwordMatch) {
            return res.status(400).json(
                {
                    message: "Password does not match",
                    success:false
                }
            );
        }
        
        const hashedPassword = await hashPassword(password);
        
        const newUser = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });
        
        if (!newUser) {
            return res.status(400).json(
                {
                    message: "User not created",
                    success:false
                }
            );
        }
        
        const token = generateJWTToken({email: newUser.email, id: newUser._id});
        
        const savedUser = await newUser.save();
        
        if (!savedUser) {
            return res.status(400).json(
                {
                    message: "User not saved",
                    success:false
                }
            );
        }
        
        return res.status(200).json(
            {
                message: "User created successfully",
                success:true,
                data: {
                    user: savedUser,
                    token
                }
            }
        );
    }catch (error) {
        return res.status(500).json(
            {
                message: "Internal server error",
                success:false
            }
        );
    }
}

// TODO : Implement login