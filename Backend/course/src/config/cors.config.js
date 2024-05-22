import cors from "cors";
import {PRODUCTION_SERVER_URL} from "../constants/environmet.js";

const configureCors = (app) => {
    app.use(
        cors({
            origin: [
                `${PRODUCTION_SERVER_URL}`,
                'http://localhost:5000',
            ],
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'],
            credentials: true,
        })
    );
}

export default configureCors;