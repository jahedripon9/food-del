import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { connectDB } from './config/db.js';
import foodRoute from './routers/foodRoute.js';
import userRouter from './routers/userRoute.js';
import cartRouter from './routers/cartRoute.js';
import orderRouter from './routers/orderRoute.js';
import connectCloudinary from './config/cloudinary.js';

// app config
const app = express();
const port = 4000

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();
connectCloudinary()


// API endpoints
app.use("/api/food", foodRoute);

app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter)

// hello
app.get('/', (req, res) => {
    res.send("API Working")
})


app.listen(port, () => console.log('Server Started on PORT:' + port))

