import {Router} from "express";
import {
    createCategory,
    deleteCategory,
    getAllCategories, getCategoriesAsTree,
    getCategoryById,
    updateCategory
} from "../controllers/category.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const router = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     description: Retrieve a list of categories with optional filtering, sorting, and pagination.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number of the categories list
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 1000
 *         description: Number of categories per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Keyword to search the categories
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Parameter to sort by (e.g., title, description)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           default: 'asc'
 *           enum: [asc, desc]
 *         description: Order of sort, ascending or descending
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPage:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                 message:
 *                   type: string
 *                   example: Categories fetched successfully!
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/', getAllCategories);

/**
 * @swagger
 * /categories/tree:
 *   get:
 *     summary: Retrieve categories structured as a tree
 *     description: Fetches all categories and organizes them into a hierarchical tree structure.
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: Categories structured as a tree fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categories fetched successfully!
 *                 category:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         description: The title of the category
 *                       children:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Category'
 *                       description:
 *                         type: string
 *                         description: The description of the category
 *                       slug:
 *                         type: string
 *                         description: The slug of the category, used for URLs
 *                       status:
 *                         type: string
 *                         description: The status of the category
 *                       coverImage:
 *                         type: string
 *                         description: The URL of the cover image for the category
 *                       parent:
 *                         type: string
 *                         description: The parent category ID
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/tree', getCategoriesAsTree);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Retrieve a specific category by ID
 *     description: Get detailed information about a category by providing the category ID.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to retrieve
 *     responses:
 *       200:
 *         description: Category fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category fetched successfully!
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category not found!
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/:categoryID', getCategoryById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Adds a new category to the system with optional parent category for hierarchical structure.
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the category
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 description: The description of the category
 *                 example: All electronic products
 *               status:
 *                 type: string
 *                 enum: [Active, Draft, Deactive]
 *                 description: The status of the category
 *                 example: Draft
 *               coverImage:
 *                 type: string
 *                 description: The URL of the cover image for the category
 *                 example: http://example.com/image.jpg
 *               parent:
 *                 type: string
 *                 description: The parent category ID if this is a sub-category
 *                 example: 60d0fe4f5311236168a109ca
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category created successfully!
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Parent category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/',authMiddleware,adminMiddleware, createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Update an existing category
 *     description: Modifies an existing category's information based on the provided fields. Only fields that are provided will be updated.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The new title of the category
 *                 example: Updated Electronics
 *               description:
 *                 type: string
 *                 description: The new description of the category, if updating
 *                 example: Includes updated electronic products
 *               status:
 *                 type: string
 *                 enum: [Active, Draft, Deactive]
 *                 description: The new status of the category, if updating
 *                 example: Active
 *               coverImage:
 *                 type: string
 *                 description: The new URL of the cover image for the category, if updating
 *                 example: http://example.com/new-image.jpg
 *               parent:
 *                 type: string
 *                 description: The new parent category ID if updating the hierarchical structure
 *                 example: 60d0fe4f5311236168a109cb
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category updated successfully!
 *                 category:
 *                   $ref: '#/components/schemas/Category'
 *       400:
 *         description: Validation error or category could not be updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Category not found or parent category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.patch('/:categoryID',authMiddleware,adminMiddleware, updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Deletes a category by its ID. If the category has child categories, it sets their parent to null before deleting the category.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to be deleted
 *     responses:
 *       204:
 *         description: Category deleted successfully, no content to return
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category not found!
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/:categoryID',authMiddleware,adminMiddleware, deleteCategory);


export default router;