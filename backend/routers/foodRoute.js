import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import authMiddleware from '../middleware/auth.js';
import upload from '../middleware/multer.js';


const foodRoute = express.Router();





foodRoute.post('/add', authMiddleware, upload.fields([
    { name: 'image1', maxCount: 1 }
]), addFood);
foodRoute.get('/list', listFood);
foodRoute.post('/remove', removeFood);

export default foodRoute;
