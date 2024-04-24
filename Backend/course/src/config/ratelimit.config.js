import rateLimit from "express-rate-limit";

const configureRateLimit = (app) => {
    const limiter = rateLimit({
        windowMs: 1 * 60 * 1000, // 1 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        standardHeaders: true,
        legacyHeaders: false
    });
    app.use(limiter);
}

export default configureRateLimit;