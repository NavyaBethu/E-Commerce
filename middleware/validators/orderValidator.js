const { body, param, validationResult } = require('express-validator');

// Validator for creating an order
const createOrderValidator = [
    body('productId')
        .notEmpty().withMessage('Product ID is required')
        .isInt({ gt: 0 }).withMessage('Product ID must be a positive integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validator for updating order status
const updateOrderStatusValidator = [
    param('id')
        .notEmpty().withMessage('Order ID is required')
        .isInt({ gt: 0 }).withMessage('Order ID must be a positive integer'),
    body('status')
        .optional()
        .isString().withMessage('Status must be a string')
        .isIn(['pending', 'processing', 'shipped', 'delivered']).withMessage('Status must be one of the following: pending, processing, shipped, delivered'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


module.exports = { createOrderValidator, updateOrderStatusValidator };
