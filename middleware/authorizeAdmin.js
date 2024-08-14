const User = require('../models/userModel');
const authorizeAdmin = async (req, res, next) => {
  try {
    const userId = req.userId; 
    const user = await User.findByPk(userId);
    if (user && user.role === 'admin') {
      next(); 
    } else {
      res.status(403).json({ message: 'Access to admins only' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = authorizeAdmin;
