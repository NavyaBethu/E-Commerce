const jwt=require("jsonwebtoken");
const user=require("../models/userModel");
const authenticate = async (req, res, next) => {
  
  try {
    
    const token = req.headers.authorization || req.headers.token; 
      if (!token) return res.status(401).json({ message: 'No token provided' });
      const tokenToVerify = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
  
      const decoded = jwt.verify(tokenToVerify, process.env.ACCESS_TOKEN_SECRET); 
      const User= await user.findByPk(decoded.userId);
  
      if (User) {
        req.userId = User.id;
        next();
      } else {
        res.status(401).json({ message: 'Invalid' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
  };
  
  module.exports = authenticate;