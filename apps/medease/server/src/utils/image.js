import { createWorker } from 'tesseract.js';
import { fromPath } from 'pdf2pic';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

export async function extractTextFromFile(filePath) {
    let text = '';

    try {
        if (filePath.endsWith('.pdf')) {
            const pdfToImages = fromPath(filePath, { density: 300 });
            const pdfBytes = fs.readFileSync(filePath);
            const pdfDoc = await PDFDocument.load(pdfBytes);
            const totalPages = pdfDoc.getPageCount();

            for (let page = 1; page <= totalPages; page++) {
                const image = await pdfToImages(page);
                text += await extractTextFromImage(image.path);
            }
        } else {
            text += await extractTextFromImage(filePath);
        }
    } catch (error) {
        console.error('Error extracting text from file:', error);
    }

    return text;
}

async function extractTextFromImage(imagePath) {
    const worker = await createWorker('eng');

    try {
        const { data: { text } } = await worker.recognize(imagePath);
        return text;
    } catch (error) {
        console.error("Error recognizing text:", error);
        throw error;
    } finally {
        await worker.terminate();
    }
}