import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import fs from 'fs';

const foodRoute = express.Router();

// ✅ Use writable temporary directory
const uploadPath = '/tmp/uploads';

// ✅ Create the folder if it doesn't exist
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

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
