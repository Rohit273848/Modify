import mongoose  from "mongoose";

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3 * 24 * 60 * 60 // Token expires after 7 days
    }
})

export default mongoose.model("Token", tokenSchema);