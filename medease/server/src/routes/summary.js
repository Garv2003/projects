import express from 'express';
import multer from 'multer';
import { extractTextFromFile } from '../utils/image.js';
import { generateDynamicPrompt, generateSummary } from '../utils/prompt.js';
import { uploadFile } from '../bucket/bucket.action.js';
import Prescription from '../models/medication.js';
import "dotenv/config";
import fs from 'fs';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Failed to delete file:', err);
        } else {
            console.log('File deleted successfully.');
        }
    });
}

router.post('/summary', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    try {
        const text = await extractTextFromFile(req.file.path);
        const summary = await generateDynamicPrompt(text);
        const wholeSummary = await generateSummary(text);
        const { publicURL, imagefile } = await uploadFile(req.file);
        deleteFile(req.file.path);
        const prescription = await Prescription.create({ summary, publicURL, imagefile, wholeSummary, userId: req.userId });
        return res.json({ message: 'Summary created successfully', prescription });
    } catch (error) {
        console.error('Error processing file:', error);
        deleteFile(req.file.path);
        return res.status(500).send('An error occurred while processing the file.');
    }
});

router.delete('/summary', (req, res) => {
    return res.send('Delete summary');
});

export default router;