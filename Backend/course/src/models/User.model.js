import {Schema, model} from "mongoose";
import {USER_ROLES} from "../constants/types.js";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    contact:[
        {
            type:{
                type: String,
                required: true
            },
            contactPhone:{
                countryCode: {
                    type: String,
                    required: true
                },
                phoneNumber: {
                    type: String,
                    required: true
                }
            }
        }
    ],
    avatar: {
        type: String
    },
    gender: {
        type: Boolean,
    },
    password: {
        type: String,
        required: true
    },
    mailListApproved: {
        type: Boolean,
        default: false
    },
    mailConfirm: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum:[USER_ROLES],
        default:USER_ROLES.USER,
        required: true
    },

}, {
    timestamps: true
});

userSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
}

export default model('User', userSchema);