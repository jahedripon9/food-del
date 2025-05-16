import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); 

const authMiddleware = async (req, res, next) => {
    try {
        
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not Authorized. Please login again." });
        }

        
        const token = authHeader.split(" ")[1];

        
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        
        req.body.userId = token_decode.id;

        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        return res.status(403).json({ success: false, message: "Invalid Token" });
    }
};

export default authMiddleware;
