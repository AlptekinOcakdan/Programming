import {Router} from "express";
import {API_PREFIX} from "../constants/environmet.js";
import {CustomError, globalErrorHandler} from "../middlewares/errorHandler.middleware.js";
import authRoutes from "./auth.routes.js";

const initializeRoutes = (app) => {
    /**
     * @swagger
     * /healthcheck:
     *  get:
     *     tags:
     *     - Healthcheck
     *     description: Responds if the app is up and running
     *     responses:
     *       200:
     *         description: App is up and running
     */
    app.get('/healthcheck', (req, res) => {
        res.status(200).send('OK');
    });
    
    const routes = new Router();
    
    // routes
    routes.use('/auth', authRoutes);
    
    app.use(`${API_PREFIX}`, routes);
    
    app.all('*', (req, res,next) => {
        const errorMessage = `Route not found: ${req.originalUrl}`;
        const error = new CustomError(errorMessage.trim(), 404);
        next(error);
    });
    
    app.use(globalErrorHandler);
};

export default initializeRoutes;