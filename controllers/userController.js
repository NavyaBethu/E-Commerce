const user=require("../models/userModel")
const { sendVerificationEmail } = require('../services/sendMail');
const { generateVerificationToken, verifyToken } = require('../middleware/token');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const newUser = await user.create({ name, email, password, role });
        const token = generateVerificationToken(newUser.id);
        newUser.verificationToken = token;
        await newUser.save();
         await sendVerificationEmail(email, token);
        return res.status(201).json({ message: 'Registration successful, please verify your email.' });
    } catch (error) {
       return  res.status(400).json({ message: error.message });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
const User = await user.findOne({ where: { email } });
        if (!User) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const match = await bcrypt.compare(password, User.password);

        if (!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = generateVerificationToken(User.id);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const verifyingUser=async(req,res)=>{
    try {
    const { token } = req.query;
    const { userId } = verifyToken(token);
    const userfind = await user.findByPk(userId);
    if (userfind) {
      userfind.isVerified = true;
      userfind.verificationToken = null; 
      await userfind.save();
      res.status(200).json({ message: 'Email verified successfully!' });
    } else {
      res.status(400).json({ message: 'Invalid or expired verification token.' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token.' });
  }
};


module.exports={createUser,
    loginUser,
    verifyingUser

}