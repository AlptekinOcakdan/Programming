import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import morganBody from "morgan-body";
import configureSwagger from "./swagger.config.js";

export default function (app){
    app.use(helmet());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(passport.initialize());
    
    
    morganBody(app);
    
    configureSwagger(app);
}