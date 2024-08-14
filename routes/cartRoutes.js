const express = require("express");
const router=express.Router();
const cart=require("../controllers/cartController");
const authenticate=require("../middleware/authenticate");
const isVerified=require("../middleware/userVerification");
const {addProductToCartValidator,deleteCartItemValidator,updateCartItemValidator}=require("../middleware/validators/cartValidator");

router.use(authenticate,isVerified)
router.get("/get-items", cart.getCartItems);
router.post("/add-items",addProductToCartValidator, cart.addProductToCart);
router.put("/update-items/:id",updateCartItemValidator, cart.updateitem);
router.delete("/delete-item/:id", deleteCartItemValidator,cart.deleteCartItem);
module.exports=router

