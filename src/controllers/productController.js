import Product from "../../models/product.js";

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

const getAllProductsById = async (req, res, next) => {
    try {
        const foundProduct = await Product.findById(req.params.id);

        if (!foundProduct) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado",
            });
        }

        res.status(200).json({
            success: true,
            data: foundProduct,
        });
    } catch (error) {
        next(error);
    }
};


const createProduct = async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Producto creado con éxito",
            data: newProduct,
        });
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true },
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado",
            });
        }

        res.status(200).json({
            success: true,
            message: "Producto actualizado correctamente",
            data: updatedProduct,
        });
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado",
            });
        }

        return res.status(201).json({
            success: true,
            message: "Producto eliminado",
            data: deletedProduct,
        });
    } catch (error) {
        next(error);
    }
};

export {
    getAllProducts,
    getAllProductsById,
    createProduct,
    updateProduct,
    deleteProduct,
};
