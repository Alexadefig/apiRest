import mongoose from ("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [ true,"El nombre de usuario es obligatorio"],
            trim: true,
        },

        email:{
            type:String,
            require: [true, "El mail es obligatorio"],
            unique: true,
            lowecase: true,
            trim:true,
        },
            role:{
            type:String,
            enum: ["user","admin"],
            default:"user",
        },
    });

export default mongoose.model("userSchema");