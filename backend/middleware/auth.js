import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // .env ফাইল থেকে ভেরিয়েবল লোড করা

const authMiddleware = async (req, res, next) => {
    try {
        // ১. টোকেন চেক করা
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not Authorized. Please login again." });
        }

        // ২. "Bearer <TOKEN>" থেকে শুধুমাত্র টোকেনটি আলাদা করা
        const token = authHeader.split(" ")[1];

        // ৩. টোকেন যাচাই করা
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // ৪. ব্যবহারকারীর আইডি সংযুক্ত করা
        req.body.userId = token_decode.id;

        // ৫. পরবর্তী Middleware-এ পাঠানো
        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        return res.status(403).json({ success: false, message: "Invalid Token" });
    }
};

export default authMiddleware;
