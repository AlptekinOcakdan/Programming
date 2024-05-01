/**
 * Routes that are not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/"
]

/**
 * Routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
]

export const apiAuthPrefix = "/api/auth";