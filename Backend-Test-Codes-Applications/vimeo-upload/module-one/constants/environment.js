import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const PRODUCTION_SERVER_URL = process.env.PRODUCTION_SERVER_URL;
export const API_PREFIX = process.env.API_PREFIX;
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
