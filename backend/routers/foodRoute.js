import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const foodRoute = express.Router();

// ✅ Use Cloudinary for image storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'food_images',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage });

foodRoute.post('/add', upload.single('image'), addFood);
foodRoute.get('/list', listFood);
foodRoute.post('/remove', removeFood);

export default foodRoute;
