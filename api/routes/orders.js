import express from "express"
import Review from "../models/Review.js";
import { createOrder, deleteOrder, getHotelOrder, getOrder, getOrders, getRevenueByHotel, getTotalRevenue, getUserOrder } from "../controllers/order.js";

const router = express.Router();

//create
router.post("/", createOrder);


//delete
router.delete("/:userId/:hotelId", deleteOrder);

//get
router.get("/find/:id", getOrder);

//getall
router.get("/", getOrders);

router.get("/getHotelOrder/:hotelId", getHotelOrder);
router.get("/getUserOrder/:userId", getUserOrder);

//get orders total revenue

router.get("/get/total/revenue", getTotalRevenue)
router.get("/get/revenueby/hotel/:hotelName", getRevenueByHotel)

export default router;