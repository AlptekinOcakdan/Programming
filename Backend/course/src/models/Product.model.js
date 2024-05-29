import {model, Schema} from "mongoose";
import {STATUS} from "../constants/types.js";

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

const Product = model('Product', productSchema);

export default Product;