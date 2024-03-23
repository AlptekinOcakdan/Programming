import express from 'express';
import {PORT} from "./src/constants/environmet.js";
const app = express();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});