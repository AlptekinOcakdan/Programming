import express from 'express';
import multer from 'multer';
import { processVideo } from '../services/videoManagement.service.js';
import { uploadVideoToVimeo } from '../services/vimeoUpload.service.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * /video/upload:
 *   post:
 *     summary: Uploads a video file.
 *     description: Receives a video file, processes it, and uploads it to Vimeo.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: Video file to upload.
 *     responses:
 *       200:
 *         description: Video uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Video uploaded successfully
 *                 vimeoUri:
 *                   type: string
 *                   example: /videos/123456789
 *       500:
 *         description: Failed to upload video
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to upload video
 */
router.post('/upload', upload.single('video'), async (req, res) => {
    try {
        const outputFilename = `uploads/processed_${Date.now()}.mp4`;
        const processedVideoPath = await processVideo(req.file.path, outputFilename);
        const vimeoUri = await uploadVideoToVimeo(processedVideoPath);
        res.send({ message: 'Video uploaded successfully', vimeoUri });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).send({ error: 'Failed to upload video' });
    }
});

export default router;