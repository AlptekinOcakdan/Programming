import {NODE_ENV} from "../constants/environmet.js";

export class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

const devErrors = (error, res) => {
    console.log('Error: ', error);
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stack: error.stack,
        error
    });
};

const prodErrors = (error, res) => {
    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message
        });
    } else {
        console.log('Error: ', error);
        res.status(500).json({
            status: 500,
            message: 'Something went wrong'
        });
    }
};

const handleCastError = (error) => {
    const message = `Invalid ${error.path}: ${error.value}`;
    return new CustomError(message, 400);
};

const handleDuplicateError = (error) => {
    const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value`;
    return new CustomError(message, 400);
};

const handleValidationError = (error) => {
    const errors = Object.values(error.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new CustomError(message, 400);
};


export const globalErrorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (NODE_ENV === 'development') {
        devErrors(error, res);
    } else if (NODE_ENV === 'production') {
        let err = {...error};
        if (err.name === 'CastError') err = handleCastError(err);
        if (err.code === 11000) err = handleDuplicateError(err);
        if (err.name === 'ValidationError') err = handleValidationError(err);
        prodErrors(err, res);
    }
};