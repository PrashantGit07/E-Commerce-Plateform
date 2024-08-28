import Order from "../models/Order.js";

export const CreateOrder = async (req, res) => {
    try {
        const { items, totalPrice, status } = req.body

        const user = req.user._id

        const order = new Order({
            user, items, totalPrice, status: status || 'Placed'
        })
        await order.save()
        res.status(201).json({
            status: 201,
            message: "Order Created Successfully",
            order
        })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}


export const getOrder = async (req, res) => {
    try {
        const { orderId } = req.params

        const order = await Order.findById(orderId)

        if (!order) {
            return res.status(404).json({
                status: 404,
                message: "Order Not Found"
            })
        }
        order.status = "confirmed"

        await order.save()

        res.status(200).json({
            status: 200,
            message: "Order Confirmed Successfully",
            order
        })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}




export const getUserOrders = async (req, res) => {
    try {
        const user = req.user._id

        const orders = await Order.find({ user })
        res.status(200).json({
            status: 200,
            message: "User Orders Fetched Successfully",
            orders
        })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}


export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email');
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Error fetching orders' });
    }
};



export const confirmOrder = async (req, res) => {
    try {
        const { orderId } = req.params
        const order = await Order.findById(orderId)

        if (!order) {
            return res.status(404).json({
                status: 404,
                message: "Order Not Found"
            })
        }
        order.status = "Confirmed"
        await order.save()

        res.status(200).json({
            status: 200,
            message: "Order Confirmed Successfully",
            order
        })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

export const CancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params
        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).json({
                status: 404,
                message: "Order Not Found"
            })
        }
        order.status = "Cancelled"
        await order.save()
        res.status(200).json({
            status: 200,
            message: "Order Cancelled Successfully",
            order
        })
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

export const DeleteOrderEntryByAdmin = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Find the order by ID
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                status: 404,
                message: "Order Not Found"
            });
        }

        // Only delete if the order is cancelled
        if (order.status === "Cancelled") {
            await Order.findByIdAndDelete(orderId);
            return res.status(200).json({
                status: 200,
                message: "Order entry deleted successfully"
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: "Only cancelled orders can be deleted"
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
};
