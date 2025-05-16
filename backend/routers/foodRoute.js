import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';

const foodRoute = express.Router();

// ✅ Use /tmp for writable file storage in serverless environments
const uploadDir = '/tmp/uploads';

// ✅ Ensure directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

foodRoute.post('/add', upload.single('image'), addFood);
foodRoute.get('/list', listFood);
foodRoute.post('/remove', removeFood);

export default foodRoute;
