import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: String,
        number: Number,
        email: String,
        password: String
    }
)

export const UserModel = mongoose.model("User", userSchema); 