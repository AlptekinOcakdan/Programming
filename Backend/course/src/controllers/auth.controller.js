import User from '../models/User.model.js';
import Token from "../models/Token.model.js";
import {
    generateJWTToken,
    hashPassword,
    comparePassword,
    generatePasswordResetToken,
    verifyPasswordResetToken
} from "../utils/auth.utils.js";
import moment from "moment";
import {TOKEN_TYPES} from "../constants/types.js";

export const register = async (req, res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        const isUserExist = await User.findOne({email});

        if (isUserExist) {
            return res.status(400).json(
                {
                    message: "User already exist",
                    success: false
                }
            );
        }

        const passwordMatch = password === confirmPassword;
        if (!passwordMatch) {
            return res.status(400).json(
                {
                    message: "Password does not match",
                    success: false
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
                    success: false
                }
            );
        }

        const token = generateJWTToken({email: newUser.email, id: newUser._id});

        const savedUser = await newUser.save();

        if (!savedUser) {
            return res.status(400).json(
                {
                    message: "User not saved",
                    success: false
                }
            );
        }

        return res.status(200).json(
            {
                message: "User created successfully",
                success: true,
                data: {
                    user: savedUser,
                    token
                }
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                message: "Internal server error",
                success: false
            }
        );
    }
}


export const login = async (req, res) => {
    const {identifier, password} = req.body;

    try {
        const isEmail = identifier.includes('@');

        let user;
        if (isEmail) {
            user = await User.findOne({email: identifier});
        } else {
            user = await User.findOne({'contact.contactPhone.phoneNumber': identifier});
        }

        if (!user) {
            return res.status(400).json(
                {
                    message: "User not found",
                    success: false
                }
            );
        }

        const isPasswordMatch = await comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json(
                {
                    message: "Password does not match",
                    success: false
                }
            );
        }

        const token = generateJWTToken({email: user.email, id: user._id});

        return res.status(200).json(
            {
                message: "User logged in successfully",
                success: true,
                data: {
                    token,
                    user: user.toJSON()
                }
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                message: "Internal server error",
                success: false
            }
        );
    }
}

export const forgotPassword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json(
                {
                    message: "User not found",
                    success: false
                }
            );
        }

        const resetToken = generatePasswordResetToken({email: user.email, id: user._id});
        const token = new Token({
            user: user._id,
            token: resetToken,
            type: 'passwordReset',
            expires: moment().add(1, 'hours').toDate(),
        });
        // await sendPasswordResetEmail({ to: email, token: resetToken });
        await token.save();

        return res.status(200).json(
            {
                message: "Password reset email sent successfully",
                success: true
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                message: "Internal server error",
                success: false
            }
        );
    }
}

export const resetPassword = async (req, res) => {
    const {token} = req.params;
    const {password, confirmPassword} = req.body;
    try {
        const isTokenExist = await Token.findOne({token, type: TOKEN_TYPES.PASSWORD_RESET});

        if (!isTokenExist) {
            return res.status(400).json(
                {
                    message: "Token is invalid",
                    success: false
                }
            );
        }

        // const isTokenExpired = moment().isAfter(isTokenExist.expires);
        const isTokenExpired = isTokenExist.expires < moment().toDate();
        
        if (isTokenExpired){
            return res.status(400).json(
                {
                    message: "Token expired",
                    success: false
                }
            );
        }
        
        const decode = verifyPasswordResetToken(token);
        
        if (!decode) {
            return res.status(400).json(
                {
                    message: "Invalid token",
                    success: false
                }
            );
        }
        
        const user = await User.findById(decode.id);
        
        if (!user) {
            return res.status(400).json(
                {
                    message: "User not found",
                    success: false
                }
            );
        }
        
        const passwordMatch = password === confirmPassword;
        
        if (!passwordMatch) {
            return res.status(400).json(
                {
                    message: "Password does not match",
                    success: false
                }
            );
        }
        
        const hashedPassword = await hashPassword(password);
        
        user.password = hashedPassword;
        
        await user.save();
        
        return res.status(200).json(
            {
                message: "Password reset successfully",
                success: true
            }
        );
    }catch (error) {
        return res.status(500).json(
            {
                message: "Internal server error",
                success: false
            }
        );
    }
    
}
export const changePassword = async (req, res) => {
    const {userId} =req.params;
    const {oldPassword, newPassword, confirmPassword} = req.body;
    
    try {
        if (!userId){
            return res.status(400).json(
                {
                    message: "User Id is required",
                    success: false
                }
            );
        }
        
        const user = await User.findById(userId);
        
        if (!user){
            return res.status(400).json(
                {
                    message: "User not found",
                    success: false
                }
            );
        }
        
        const isPasswordMatch = await comparePassword(oldPassword, user.password);
        if (!isPasswordMatch){
            return res.status(400).json(
                {
                    message: "Old password does not match",
                    success: false
                }
            );
        }
        
        const isSamePassword = await comparePassword(newPassword, user.password);
        if (isSamePassword){
            return res.status(400).json(
                {
                    message: "New password cannot be the same as old password",
                    success: false
                }
            );
        }
        
        const passwordMatch = newPassword === confirmPassword;
        if (!passwordMatch){
            return res.status(400).json(
                {
                    message: "Password does not match",
                    success: false
                }
            );
        }
        
        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        
        await user.save();
        
        return res.status(200).json({
            message: "Password changed successfully",
            success: true
        });
    }catch (error) {
        return res.status(500).json(
            {
                message: "Internal server error",
                success: false
            }
        );
    }
}
