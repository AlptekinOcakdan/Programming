import {Router} from "express";
import {
    createProduct, deleteProduct,
    getAllProducts,
    getProductByIdentifier,
    getRelatedProducts, updateProduct
} from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Product
 *  description: Product management
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieves a list of products
 *     tags: [Product]
 *     description: Optional description in *Markdown*
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword for product titles
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category ID to filter products
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number of the product list
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of products per page
 *       - in: query
 *         name: sortField
 *         schema:
 *           type: string
 *         description: Field to sort the products
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *         description: Order of sorting (asc or desc)
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     totalPage:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *       404:
 *          description: No products found
 *       500:
 *         description: Error message in case of an exception
 */
router.get("/", getAllProducts);

/**
 * @swagger
 * /products/{identifier}:
 *   get:
 *     summary: Retrieves a product by its ID or slug
 *     tags: [Product]
 *     description: Fetches a single product based on the unique ID or slug passed in the URL as a path parameter. If the identifier is an ObjectId, it will fetch by ID, otherwise, it will attempt to fetch by slug.
 *     parameters:
 *       - in: path
 *         name: identifier
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID or slug of the product to retrieve
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get("/:identifier", getProductByIdentifier);

/**
 * @swagger
 * /products/related/{identifier}:
 *   get:
 *     summary: Retrieves related products
 *     tags: [Product]
 *     description: Fetches a list of related products based on the category of the product identified by either its ID or slug. The endpoint returns up to 20 related products.
 *     parameters:
 *       - in: path
 *         name: identifier
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID or slug of the product for which to find related products
 *     responses:
 *       200:
 *         description: A list of related products based on category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 relatedProducts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error due to an unexpected error
 */
router.get('/related/:identifier', getRelatedProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Creates a new product
 *     tags: [Product]
 *     description: Adds a new product to the database. This operation requires authentication and administrative privileges.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - description
 *               - stock
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 description: Name of the product
 *               price:
 *                 type: number
 *                 description: Price of the product
 *               description:
 *                 type: string
 *                 description: Detailed description of the product
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of image URLs for the product
 *               discount:
 *                 type: number
 *                 description: Discount on the product in percentage
 *               stock:
 *                 type: number
 *                 description: Stock quantity available
 *               category:
 *                 type: string
 *                 description: ID of the product category
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, DEACTIVE, DRAFT]
 *                 description: Current status of the product
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request due to invalid input or missing required fields
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware, adminMiddleware, createProduct);

/**
 * @swagger
 * /products/{productId}:
 *   put:
 *     summary: Updates an existing product
 *     tags: [Product]
 *     description: Modifies an existing product in the database based on its productId. This operation requires authentication and administrative privileges. Only certain fields can be updated.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated name of the product
 *               price:
 *                 type: number
 *                 description: Updated price of the product
 *               description:
 *                 type: string
 *                 description: Updated description of the product
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated list of image URLs for the product
 *               discount:
 *                 type: number
 *                 description: Updated discount on the product in percentage
 *               stock:
 *                 type: number
 *                 description: Updated stock quantity available
 *               category:
 *                 type: string
 *                 description: Updated category ID of the product
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, DEACTIVE, DRAFT]
 *                 description: Updated status of the product
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 updatedProduct:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request due to invalid update fields
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.put("/:productId", authMiddleware, adminMiddleware, updateProduct);

/**
 * @swagger
 * /products/{productId}:
 *   delete:
 *     summary: Deletes a specific product
 *     tags: [Product]
 *     description: Removes a product from the database based on its unique productId. This operation requires authentication and administrative privileges.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of the product to be deleted
 *     responses:
 *       204:
 *         description: Product deleted successfully, no content to return
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error due to an unexpected error
 */
router.delete('/:productId', authMiddleware, adminMiddleware, deleteProduct);

export default router;