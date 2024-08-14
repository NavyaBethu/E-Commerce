const jwt = require('jsonwebtoken');

const generateVerificationToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' });
};

const verifyToken = (token) => {
  return jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, );
};

module.exports = { generateVerificationToken, verifyToken };
