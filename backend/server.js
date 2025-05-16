import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

import { connectDB } from './config/db.js';
import foodRoute from './routers/foodRoute.js';
import userRouter from './routers/userRoute.js';
import cartRouter from './routers/cartRoute.js';
import orderRouter from './routers/orderRoute.js';

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// Ensure /tmp/uploads exists
const uploadPath = '/tmp/uploads';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Serve uploaded images from /tmp/uploads
app.use('/images', express.static(uploadPath));

// API endpoints
app.use("/api/food", foodRoute);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// health check
app.get('/', (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log('Server Started on PORT: ' + port);
});
