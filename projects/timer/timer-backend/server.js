import express from "express"; 
import dotenv from "dotenv";
import {PORT} from "./constants/environment.js";
import connectToDatabase from "./config/db.config.js";

dotenv.config();

const app = express();

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectToDatabase();
});