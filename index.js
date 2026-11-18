import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import productRoutes from "./src/routes/productRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import { notFound, errorHandler } from "./src/middlewares/errorMiddleware.js";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API REST operativa",
        endpoints: {
            products: "/api/products",
            users: "/api/user",
        },
    });
});


app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDB();
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Servidor escuchando en el puerto ${port}`);
        });
    } catch (error) {
        console.error(`No se pudo iniciar el servidor: ${error.message}`);
        process.exitCode = 1;
    }
};

startServer();
export default app;
