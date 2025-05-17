import { v2 as cloudinary } from "cloudinary"; 
import foodModel from '../models/foodModel.js';

const addFood = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
        } = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const images = [image1].filter((item) => item !== undefined)
        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })
        )
        const foodData = {
            name,
            description,
            category,
            price: Number(price),
            image: imageUrl,

        }
        console.log(foodData);
        const food = new foodModel(foodData);
        await food.save()

        res.json({ success: true, message: "Food Added " })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
export default addFood;
