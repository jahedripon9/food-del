import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import foodRoute from './routers/foodRoute.js';
import userRouter from './routers/userRoute.js';
import cartRouter from './routers/cartRoute.js';
import orderRouter from './routers/orderRoute.js';

// app config
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// API endpoints
app.use("/api/food", foodRoute);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get('/', (req, res) => {
    res.send("API Working");
});

// ❌ Remove app.listen() — Vercel will invoke the app as a function
export default app;
