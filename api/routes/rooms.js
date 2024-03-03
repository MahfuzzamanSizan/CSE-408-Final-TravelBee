import express from "express"
import { createRoom, deleteRoom, getHotel, getOneRoom, getRoom, getRoomCount, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/:hotelId", createRoom);


//update
router.put("/:id", updateRoom);
router.put("/availability/:id", updateRoomAvailability);

//delete
router.delete("/:id", deleteRoom);

//get
router.get("/:id", getRoom);

//getall
router.get("/", getRooms);

router.get("/:suiteId/:roomId", getOneRoom);

router.get("/find/getHotelByRoom/:roomId", getHotel)

router.get("/get/room/Count", getRoomCount)



export default router;