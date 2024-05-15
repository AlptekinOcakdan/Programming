import {model, Schema} from "mongoose";
import {STATUS} from "../constants/types.js";


/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - title
 *         - slug
 *         - status
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the category
 *           example: Electronics
 *         description:
 *           type: string
 *           description: The description of the category
 *           example: All electronic products
 *         slug:
 *           type: string
 *           description: The slug of the category, used for URLs
 *           example: electronics
 *         status:
 *           type: string
 *           description: The status of the category
 *           enum: [Active, Draft, Deactive]
 *           example: Draft
 *         coverImage:
 *           type: string
 *           description: The URL of the cover image for the category
 *           example: http://example.com/image.jpg
 *         parent:
 *           type: string
 *           description: The parent category ID
 *           example: 60d0fe4f5311236168a109ca
 */
const categorySchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: false,
        trim: true
    },
    slug:{
        type: String,
        lowercase: true,
        unique: true
    },
    status:{
        type: String,
        enum:STATUS,
        default:STATUS.DRAFT,
        required: true
    },
    coverImage:{
        type: String,
        required: false
    },
    parent:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    }
},{
    timestamps: true
});

const Category = model('Category', categorySchema);

export default Category;