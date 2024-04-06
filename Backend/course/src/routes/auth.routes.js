import {Router} from "express";
import {login, register} from "../controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: User authentication routes
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registers a new user
 *     tags: [Auth]
 *     description: This route registers a new user by taking their email, password, confirm password, first name, and last name. It returns a token and user information upon successful registration.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - confirmPassword
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address, must be unique.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password.
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 description: Confirmation of the user's password. Must match the password.
 *               firstName:
 *                 type: string
 *                 description: User's first name.
 *               lastName:
 *                 type: string
 *                 description: User's last name.
 *             example:
 *               email: user@example.com
 *               password: "password123"
 *               confirmPassword: "password123"
 *               firstName: "John"
 *               lastName: "Doe"
 *     responses:
 *       200:
 *         description: User created successfully. Returns the user information and a token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *                       description: JWT token for accessing protected routes.
 *       400:
 *         description: Bad request. Possible reasons include user already exists, passwords do not match, or user not created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *                   example: false
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in a user
 *     tags: [Auth]
 *     description: This route logs in a user by either email or phone number along with a password. It returns a token and user information upon successful login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - password
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: User's email address or phone number.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password.
 *             example:
 *               identifier: user@example.com
 *               password: "password123"
 *     responses:
 *       200:
 *         description: User logged in successfully. Returns the user information and a token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User logged in successfully
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: JWT token for accessing protected routes.
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. Possible reasons include user not found or invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *                   example: false
 */
router.post('/login', login);

export default router;