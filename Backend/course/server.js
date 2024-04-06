import express from 'express';
import {PORT} from "./src/constants/environmet.js";
import config from "./src/config/index.js";
import connectDB from "./src/config/db.config.js";
import initializeRoutes from "./src/routes/index.js";
const app = express();

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
    config(app);
    await connectDB();
    initializeRoutes(app);
});