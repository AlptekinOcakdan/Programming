import express from "express";
import {PORT} from "./constants/environment.js";
import config from "./config/index.js";
import initializeRoutes from "./routes/index.js";

const app = express();

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    config(app);
    initializeRoutes(app);
});