import express from "express"
import Review from "../models/Review.js";
import { createReview, deleteReview, deleteReviewByHotelId, deleteReviewByUserId, getAllReview, getAvgRating, getReviewByHotel, getReviewByUser } from "../controllers/review.js";

const router = express.Router();

router.post("/", createReview);


router.delete("/:id", deleteReview);

router.delete("/deleteByUserId/:userId", deleteReviewByUserId);

router.delete("/deleteByHotelId/:hotelId", deleteReviewByHotelId);

router.get("/findByHotel/:hotelId", getReviewByHotel);

router.get("/findByUser/:userId", getReviewByUser);

router.get("/", getAllReview);

router.get("/findAvgRating/:hotelId", getAvgRating);



export default router;