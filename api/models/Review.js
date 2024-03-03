import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    hotelName: {
        type: String,
        required: true
    },
    hotelId: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => {
            // Create a new Date object with the current time
            const currentDate = new Date();

            // Adjust the timezone offset to GMT+6:00
            const timezoneOffset = 6 * 60; // Offset is in minutes
            const utcTimestamp = currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000);
            const gmt6Timestamp = new Date(utcTimestamp + (timezoneOffset * 60000));
            gmt6Timestamp.setHours(gmt6Timestamp.getHours() + 6);
            return gmt6Timestamp;
        }
    }
    
});

export default mongoose.model('Review', reviewSchema);
