const { body, validationResult } = require('express-validator');

// Validator for creating and updating profiles
const profileValidator = [
    body('firstname').notEmpty().withMessage('First name is required'),
    body('lastname').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('address').optional().isString().withMessage('Address must be a string'),
    body('phonenumber').optional().isMobilePhone().withMessage('Phone number is invalid'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validator for profile retrieval and deletion
const profileIdValidator = [
    (req, res, next) => {
        if (!req.userId) {
            return res.status(400).json({ message: 'User ID is missing' });
        }
        next();
    }
];

module.exports = { profileValidator, profileIdValidator };
