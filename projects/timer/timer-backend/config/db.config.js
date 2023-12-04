import mongoose from "mongoose";
import {DATABASE_URL} from "../constants/environment.js";

mongoose.Promise = global.Promise;

mongoose.connection.on('open', () => {
    console.log('MongoDB: Connected');
});

mongoose.connection.on('error', (err) => {
    console.log('MongoDB: Error', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB: Disconnected');
});

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log("Connected to database");
    } catch (error) {
        console.error("Could not connect to database", error);
    }
};

export default connectToDatabase;