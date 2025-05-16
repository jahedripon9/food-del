import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const foodRoute = express.Router();

// ✅ Ensure /tmp/uploads exists (writable in Lambda/Vercel)
const uploadPath = '/tmp/uploads';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// ✅ Use '/tmp/uploads' instead of 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

foodRoute.post("/add", upload.single("image"), addFood);
foodRoute.get("/list", listFood);
foodRoute.post("/remove", removeFood);

export default foodRoute;
