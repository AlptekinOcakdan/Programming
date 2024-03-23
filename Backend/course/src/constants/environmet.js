import dotenv from "dotenv";

dotenv.config(
    {
        path: `.env.${process.env.NODE_ENV}`
    }
);

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const RESET_PASSWORD_SECRET = process.env.RESET_PASSWORD_SECRET;