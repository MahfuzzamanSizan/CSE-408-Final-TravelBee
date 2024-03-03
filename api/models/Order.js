import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    hotelId: {
        type: String,
        required: false
    },
    hotelName: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    cost: {
        type: Number,
        required: false
    },
    checkIn: {
        type: String,
        required: false
    },
    checkOut: {
        type: String,
        required: false
    },
    rooms: {
        type: [String]
    },
})

export default mongoose.model('Order', orderSchema);
