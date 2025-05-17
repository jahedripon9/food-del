import foodModel from "../models/foodModel.js";
import cloudinary from 'cloudinary';
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
    try {
        const uploadedImage = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "foodApp"
        });

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: uploadedImage.secure_url // ✅ Use Cloudinary URL
        });

        await food.save();

        // Delete local temp file
        fs.unlinkSync(req.file.path);

        res.json({ success: true, message: "Food item added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to add food item" });
    }
}
