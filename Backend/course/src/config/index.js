import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import morganBody from "morgan-body";
import configureSwagger from "./swagger.config.js";
import configureCors from "./cors.config.js";
import configurePassport from "./passport.config.js";
import configureRateLimit from "./ratelimit.config.js";
import configureLogger from "./logger.config.js";

export default function (app){
    app.use(helmet());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(passport.initialize());
    
    configurePassport(passport);
    
    morganBody(app);
    configureCors(app);
    configureRateLimit(app);
    configureLogger(app);
    configureSwagger(app);
}