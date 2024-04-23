import {loginUser} from "./loginUser.js";
import express from "express";

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    loginUser().then(r => console.log(r));
});

