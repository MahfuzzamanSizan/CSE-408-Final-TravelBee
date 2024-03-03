import Order from "../models/Order.js"


export const createOrder = async (req, res, next)=>{
    const newOrder = new Order(req.body)

    try{
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    }catch(err){
        next(err);
    }
}



export const deleteOrder = async (req, res, next) => {
    try {
        const { userId, hotelId } = req.body;

        if (!userId || !hotelId) {
            return res.status(400).json({ message: 'Both userId and hotelId are required.' });
        }

        // Find and delete the order matching userId and hotelId
        const deletedOrder = await Order.findOneAndDelete({ userId, hotelId });

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        res.status(200).json({ message: 'Order has been deleted.' });
    } catch (err) {
        next(err);
    }
};

export const getOrder = async (req, res, next)=>{
    try{
        const order = await Order.findById(req.params.id)
        res.status(200).json(order)
    }catch(err){
        res.status(500).json(err)
    }
}

export const getOrders = async (req, res, next)=>{
    const query = req.query
    try{    
        const orders = await Order.find(req.query)
        // console.log(query)
        // console.log(hotels)
        res.status(200).json(orders);
    }catch(err){
        next(err);
    }
}



export const getHotelOrder = async (req, res, next) => {
    try {
        const orders = await Order.find({ hotelId: req.params.hotelId });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



export const getUserOrder = async (req, res, next) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//get order total revenue

export const getTotalRevenue = async (req, res, next) => {
    try {
        const orders = await Order.find();
        let total =  0;
        orders.map(order=>{
            total += order.cost
        })
        res.status(200).json(total);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//get revenue by hotel
export const getRevenueByHotel = async (req, res, next) => {
    try {
        const orders = await Order.find({ hotelName: req.params.hotelName });
        let total =  0;
        orders.map(order=>{
            total += order.cost
        })
        res.status(200).json(total);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};



