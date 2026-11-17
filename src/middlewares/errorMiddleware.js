const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        error: "Ruta no encontrada",
        message: `No existe el endpoint ${req.method} ${req.originalUrl}`,
    });
};

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Error interno del servidor";

    //Mongoose genera Cast error cuando no puede convertir  un valor al tipo esperado
    //ejemplo: cuando el parametro id: no tiene formato valido

    if (err.name === "CastError") {
        statusCode = 400;
        message = `Formato de id inválido: ${err.value}`;
    }

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((validationError) => validationError.message)
            .join(", ");
    }

    res.status(statusCode).json({
        success: false,
        error: statusCode === 500 ? "Error interno del servidor" : "Error en la solicitud",
        message,
    });
};

export { notFound, errorHandler };
