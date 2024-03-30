import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["emailVerification", "passwordReset"],
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
},{
    timestamps: true,
});

export default mongoose.model("Token", TokenSchema);