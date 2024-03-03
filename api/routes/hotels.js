import express from "express"
import Hotel from "../models/Hotel.js"
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelCount, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/", createHotel);

//update
router.put("/:id", updateHotel);

//delete
router.delete("/:id", deleteHotel);

//get
router.get("/find/:id", getHotel);

//getall
router.get("/", getHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

router.get("/get/hotelCount", getHotelCount)

export default router;