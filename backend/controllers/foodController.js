// controllers/foodController.js
import foodModel from '../models/foodModel.js';

export const addFood = async (req, res) => {
    try {
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.file.path // multer-storage-cloudinary ব্যবহার করলে এটাই কাজ করে
        });

        await food.save();
        res.status(200).json({ success: true, message: "Food item added successfully", image: food.image });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
