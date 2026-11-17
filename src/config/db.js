import mongoose from "mongoose";

//Abre la conexión compartida de mongoose con MONGODB ATLAS 

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error("Falta definir la variable de entorno MONGODB_URI");
    }

    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB conectada en ${connection.connection.host}`);
    return connection.connection;
};

export default connectDB;