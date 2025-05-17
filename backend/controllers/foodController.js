import foodModel from "../models/foodModel.js";

// ✅ Add food item with Cloudinary image URL
const addFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const image = req.file?.path; // Cloudinary returns full URL

        if (!image) {
            return res.status(400).json({ success: false, message: "Image upload failed" });
        }

        const food = new foodModel({
            name,
            description,
            price,
            category,
            image // full Cloudinary URL
        });

        await food.save();
        res.json({ success: true, message: "Food item added successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to add food item" });
    }
};

// ✅ Get all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to list food items" });
    }
};

// ✅ Remove food item (no fs.unlink needed with Cloudinary)
const removeFood = async (req, res) => {
    try {
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food item removed successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to remove food item" });
    }
};

export { addFood, listFood, removeFood };
