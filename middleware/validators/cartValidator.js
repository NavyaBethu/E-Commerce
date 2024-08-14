const { body, param, validationResult } = require('express-validator');
const addProductToCartValidator = [
    body('productId').notEmpty().withMessage('Product ID is required').isInt().withMessage('Product ID must be an integer'),
    body('quantity').notEmpty().withMessage('Quantity is required').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
const updateCartItemValidator = [
    param('id').notEmpty().withMessage('Cart item ID is required').isInt().withMessage('Cart item ID must be an integer'),
    body('quantity').notEmpty().withMessage('Quantity is required').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
const deleteCartItemValidator = [
    param('id').notEmpty().withMessage('Cart item ID is required').isInt().withMessage('Cart item ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { addProductToCartValidator, updateCartItemValidator, deleteCartItemValidator };
