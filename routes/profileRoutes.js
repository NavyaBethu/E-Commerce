const express = require("express");
const router=express.Router();
const profile=require('../controllers/profileController');
const authenticate = require("../middleware/authenticate");
const upload = require("../middleware/upload");
const isVerified=require('../middleware/userVerification');
const {profileValidator,profileIdValidator}=require("../middleware/validators/profileValidator")

router.use(authenticate,isVerified)
router.get("/profile",profileIdValidator,profile.getall);
router.post("/add-profile",profileValidator,upload.single('profilepicture'),profile.createProfile);
router.put("/update-profile",upload.single("profilepicture"),profile.updateProfile);
router.delete("/delete-profile",profileIdValidator,profile.deleteProfile);
module.exports=router