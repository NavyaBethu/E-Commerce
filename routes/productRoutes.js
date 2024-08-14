const express = require("express");
const router=express.Router();
const product=require("../controllers/productController");
const authenticate=require("../middleware/authenticate");
const authorizeAdmin=require("../middleware/authorizeAdmin");
const upload=require("../middleware/upload");
const isVerified=require("../middleware/userVerification");
const{createProductValidator,queryProductValidator,updateProductValidator}=require("../middleware/validators/productValidator");

router.use(authenticate,isVerified)
router.post("/create-product",authorizeAdmin,upload.single('imageUrl'),createProductValidator,product.createproduct);
router.put("/product/:id",authorizeAdmin,updateProductValidator,upload.single("imageUrl"),product.updateproduct);
router.delete("/product/:id",authorizeAdmin,upload.single("imageUrl"),product.deleteProduct);
router.get("/products",queryProductValidator,product.getProducts);
module.exports=router