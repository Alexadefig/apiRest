import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "El nombre de usuario es obligatorio"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "El mail es obligatorio"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export default mongoose.model("User", userSchema);