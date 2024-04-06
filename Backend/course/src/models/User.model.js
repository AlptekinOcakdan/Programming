import {Schema, model} from "mongoose";
import {USER_ROLES} from "../constants/types.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - email
 *         - password
 *         - role
 *       properties:
 *         firstName:
 *           type: string
 *           description: User's first name.
 *         lastName:
 *           type: string
 *           description: User's last name.
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address, must be unique.
 *         contact:
 *           type: array
 *           description: Array of user's contact information.
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: Type of contact, e.g., 'phone', 'fax'.
 *               contactPhone:
 *                 type: object
 *                 properties:
 *                   countryCode:
 *                     type: string
 *                     description: Country code of the phone number.
 *                   phoneNumber:
 *                     type: string
 *                     description: User's phone number.
 *         avatar:
 *           type: string
 *           description: URL to the user's avatar image.
 *         gender:
 *           type: boolean
 *           description: User's gender, true for male and false for female.
 *         password:
 *           type: string
 *           description: User's password.
 *         mailListApproved:
 *           type: boolean
 *           default: false
 *           description: Whether the user approved being added to the mailing list.
 *         mailConfirm:
 *           type: boolean
 *           default: false
 *           description: Whether the user's email has been confirmed.
 *         role:
 *           type: string
 *           enum: [USER_ROLES]
 *           default: USER_ROLES.USER
 *           description: User's role within the system.
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         email: john.doe@example.com
 *         contact: [{ type: 'phone', contactPhone: { countryCode: '+1', phoneNumber: '1234567890' } }]
 *         avatar: 'http://example.com/avatar.jpg'
 *         gender: true
 *         password: 'password123'
 *         mailListApproved: true
 *         mailConfirm: true
 *         role: 'USER'
 */
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