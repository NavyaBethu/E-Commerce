const express = require("express");
const router=express.Router()
const user=require("../controllers/userController")
const {createUserValidator,loginUserValidator}=require("../middleware/validators/userValidator")


router.post("/user-register",createUserValidator,user.createUser);
router.post("/login-user",loginUserValidator,user.loginUser);
router.get("/verify-email",user.verifyingUser);

module.exports=router
