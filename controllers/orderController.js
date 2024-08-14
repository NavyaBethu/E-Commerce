const Order = require("../models/orderModel");
const order=require("../models/orderModel");
const product=require('../models/productModel');

const createOrder = async (req, res) => {
    try {
        const { productId} = req.body;
        const userId = req.userId;
    const findproduct = await product.findByPk(productId);

    if (!findproduct) {
        return res.status(404).json({ error: 'Product not found' });
        }
        const orderCreate = await order.create({userId,productId});
        res.status(201).json(orderCreate);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params; 
        const Order = await order.findByPk(id);
        if (!Order) {
            return res.status(404).json({ error: 'Order not found' });
        }
       Order.status = status||Order.status;
        await Order.save();
        return res.status(200).json(Order);
    } catch (error) {
        console.error('Error updating order status:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getOrders = async (req, res) => {
    try {
        const userId = req.userId; 
        const Orders = await order.findAll({
            where: { userId }
        });
        if (Orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        res.status(200).json(Orders);
    } 
    catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = {
    createOrder,updateOrderStatus,getOrders
};