const profile=require('../models/profileModel');
const getall = async (req, res) => {
    try {
        const userId = req.userId;
        const Profile = await profile.findOne({ where: { userId } });

        if (!Profile) {
            return res.status(404).json({ message: "Profile not found" });
        } else {
            return res.status(200).json({ message: "Your profile is:", profile: Profile });
        }
    } catch (err) {
        console.error("Error retrieving profile:", err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const createProfile = async (req, res) => {
    try {
        const userId = req.userId; 
        const { firstname, lastname, email, address, phonenumber } = req.body;
        const profilepicture = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : null;
        const existingProfile = await profile.findOne({ where: { userId } });

        if (existingProfile) {
            return res.status(400).json({ message: "Profile already exists for this user" });
        }
        const newProfile = await profile.create({
            userId,
            firstname,
            lastname,
            email,
            profilepicture,
            address,
            phonenumber
        });

        return res.status(201).json({ message: "Profile created successfully", profile: newProfile });
    } catch (err) {
        console.error("Error creating profile:", err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const updateProfile = async (req, res) => {
    try {
        const userId = req.userId; 
        const { firstname, lastname, email, address, phonenumber } = req.body;
        const profilepicture = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : null;

        if (!userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }
        const existingProfile = await profile.findOne({ where: { userId } });

        if (!existingProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        const updatedProfile = await profile.update({
            firstname,
            lastname,
            email,
            profilepicture,
            address,
            phonenumber
        }, {
            where: { userId },
            returning: true
        });

        return res.status(200).json({ message: "Profile updated successfully", profile: updatedProfile[1][0] });
    } catch (err) {
        console.error("Error updating profile:", err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const deleteProfile = async (req, res) => {
    try {
        const userId = req.userId; 
        const existingProfile = await profile.findOne({ where: { userId } });

        if (!existingProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        await profile.destroy({ where: { userId } });

        return res.status(200).json({ message: "Profile deleted successfully" });
    } catch (err) {
        console.error("Error deleting profile:", err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports={getall,createProfile,updateProfile,deleteProfile}