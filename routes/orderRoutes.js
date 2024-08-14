const express = require("express");
const router=express.Router();
const order=require("../controllers/ordercontroller");
const authenticate = require("../middleware/authenticate");
const authorizeAdmin = require("../middleware/authorizeAdmin");
const isVerified=require("../middleware/userVerification");

const {createOrderValidator,updateOrderStatusValidator}=require("../middleware/validators/orderValidator")
router.use(authenticate,isVerified)
router.post("/start-order",createOrderValidator,order.createOrder);
router.put("/update-status/:id",updateOrderStatusValidator,authorizeAdmin,order.updateOrderStatus);
router.get("/track-orders",order.getOrders);
module.exports=router