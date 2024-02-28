import globalErrorMiddleware, {
    CustomError,
} from '../middlewares/errorHandler.middleware.js';
import { Router } from 'express';
import videoRoutes from "./video.routes.js";
import {API_PREFIX} from "../constants/environment.js";
const initializeRoutes = (app) => {
    /**
     * @openapi
     * /healthcheck:
     *  get:
     *     tags:
     *     - Healthcheck
     *     description: Responds if the app is up and running
     *     responses:
     *       200:
     *         description: App is up and running
     */
    app.get('/healthcheck', (req, res) => res.status(200).send('OK'));
    const routes = new Router();
    routes.use('/video', videoRoutes);
    app.use(`${API_PREFIX}`, routes);
    app.all('*', (req, res, next) => {
        const err = new CustomError(
            `
      Can't find the valid endpoint ${req.originalUrl} on this server!
    `,
            404
        );
        next(err);
    });

    // global error handler middleware should be the last middleware in the chain of middlewares
    app.use(globalErrorMiddleware);
}

export default initializeRoutes;