import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import { sendMail } from '../utilities/sendMail.js';

export const addOrderItems = asyncHandler(async(req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body
    
    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order items')
    }else{
        const order = new Order({
            user: req.user._id, orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice 
        });

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

export const getOrderById = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

export const updateOrderToPaid = asyncHandler(async(req, res) => {
    const {id, status, update_time, payer} = req.body
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id,
            status,
            update_time,
            email_address: payer.email_address
        }
        const totalItems = order.orderItems.reduce((acc, item) => item.qty + acc, 0)
        const productName = order.orderItems.map((item)=> (`${item.qty} ${item.name} costing $${item.price}`)).join(', ')
        sendMail({
            email: "vifedayo418@stu.ui.edu.ng",
            subject: `SHOP IT, Payment of orders by ${req.user.name} with id ${req.user._id}`,
            html: `<h2>Payment for the order of ${totalItems} items</h2>
                    <p>${req.user.name} Paid for ${productName}</p>
                    <p>TotalPrice: ${order.totalPrice}</p>`
        })
        const updatedOrder = order.save()
        res.json({updatedOrder})
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

export const getMyOrders = asyncHandler(async(req, res) => {

    const orders = await Order.find({user : req.user._id});
    res.json(orders)
    
})

export const getOrders = asyncHandler(async(req, res) => {

    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders)
    
})

export const updateOrderToDelivered = asyncHandler(async(req, res) => {
    
    const order = await Order.findById(req.params.id);
    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()
        
        const updatedOrder = order.save()
        res.json({updatedOrder})
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})