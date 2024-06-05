import {model, Schema} from "mongoose";
import {STATUS} from "../constants/types.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - slug
 *         - price
 *         - description
 *         - stock
 *         - category
 *       properties:
 *         title:
 *           type: string
 *           description: Name of the product
 *         slug:
 *           type: string
 *           description: SEO friendly URL slug unique to every product
 *         price:
 *           type: number
 *           description: Price of the product
 *         description:
 *           type: string
 *           description: Detailed description of the product
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: List of image URLs for the product
 *         discount:
 *           type: number
 *           description: Discount on the product in percentage
 *         stock:
 *           type: number
 *           description: Stock quantity available
 *         category:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *           description: Categories associated with the product
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE, DRAFT]
 *           description: Current status of the product
 *         rating:
 *           type: number
 *           description: Average rating for the product
 *         reviews:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Review'
 *           description: Reviews posted for the product
 *     Review:
 *       type: object
 *       required:
 *         - user
 *         - body
 *       properties:
 *         user:
 *           type: string
 *           description: ID of the user who wrote the review
 *         body:
 *           type: string
 *           description: Content of the review
 */

const reviewSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body:{
        type: String,
        required: true
    }
}, {_id: false ,timestamps: true});

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug:{
        type: String,
        unique:true,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            default:null,
            required: false
        }
    ],
    discount: {
        type: Number,
        default:0,
        required: false
    },
    stock: {
        type: Number,
        required: true
    },
    category: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }
    ],
    status: {
        type: String,
        enum: STATUS,
        default: STATUS.DRAFT,
        required: false
    },
    rating: {
        type: Number,
        default: 0,
        required: false
    },
    reviews: [
        {
            type: reviewSchema,
            required: false
        }
    ]
}, {timestamps: true});

const Product = model('Product', productSchema);

export default Product;