const User = require('../models/userModel');
const checkUserVerified = async (req, res, next) => {
  try {
    const userId = req.userId; 
    if (!userId) {
      return res.status(401).json({ message: 'No user ID found' });
    }
    const user = await User.findByPk(userId);
    if (user && user.isVerified) {
      next(); 
    } else {
      return res.status(403).json({ message: 'User is not verified. Please verify your email before proceeding.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while checking verification status.' });
  }
};
module.exports = checkUserVerified;
