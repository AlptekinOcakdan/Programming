import mongoose from "mongoose";
import {DATABASE_URL} from "../constants/environmet.js";

mongoose.Promise = global.Promise;

mongoose.connection.on('open', () => {
    console.log('Connected to MongoDB')
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDb: Error , ',err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDb: Disconnected');
});

async function connectDB() {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log('MongoDb: Connected')
    } catch (error) {
        console.error('MongoDb: Error ', error);
    }
}

export default connectDB;