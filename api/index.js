import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"
import reviewsRoute from "./routes/reviews.js"
import ordersRoute from "./routes/orders.js"
import cookieParser from "cookie-parser"
import cors from 'cors';

const app = express()
dotenv.config()


const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
    }catch(error){
        throw error;   
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
})

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected");
})

//middlewares
app.use(cors());
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth" , authRoute)
app.use("/api/users" , usersRoute)
app.use("/api/hotels" , hotelsRoute)
app.use("/api/rooms" , roomsRoute)
app.use("/api/reviews" , reviewsRoute)
app.use("/api/orders" , ordersRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "something went wrong"
    res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
})

app.use((req, res, next) => {
    req.headers.host = 'https://travelbee-j1uq.onrender.com';
    next();
});

app.listen(8000, () => {
    connect()
    console.log("connected to backend")
    })
