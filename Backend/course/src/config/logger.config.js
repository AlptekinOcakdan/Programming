import {DATABASE_URL, NODE_ENV} from "../constants/environmet.js";
import {createLogger, exceptions, format, transports} from "winston";

const configureLogger = (app) => {
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    if (NODE_ENV === 'development') {
        exceptions.handle(
            new transports.Console(),
            new transports.File({filename: 'uncaughtExceptions.log'})
        );
        
        createLogger({
            transports: [
                new transports.Console({
                    level: 'info',
                    format: format.combine(format.timestamp(), format.json()),
                }),
                new transports.File({
                    filename:'info.log',
                    level: 'info',
                })
            ]
        });
    }else {
        createLogger({
            transports: [
                new transports.File({
                    filename: 'info.log',
                    level: 'info',
                    format: format.combine(format.timestamp(), format.json()),
                }),
                new transports.MongoDB({
                    level: 'error',
                    db: DATABASE_URL,
                    options: {useUnifiedTopology: true},
                    collection: 'logs',
                    format: format.combine(format.timestamp(), format.json())
                })
            ]
        })
    }
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
}

export default configureLogger;