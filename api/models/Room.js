import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    hotel: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    maxPeople: {
        type: Number,
        required: false,
    },
    desc: {
        type: String,
        required: false
    },
    roomNumbers: [{number:Number, unavailableDates: {type: [Date] } } ], 
},{timestamps:false})

export default mongoose.model('room', RoomSchema);
