const express = require('express');
const router = express.Router();

const cartControllers = require('../controllers/cartControllers.js');
const auth = require('../auth.js');
const verifyToken = auth.verifyToken;

router.get('/', verifyToken, cartControllers.viewCart);
router.post('/deleteFromCart', verifyToken, cartControllers.deleteFromCart);
router.patch('/cartQuantity', verifyToken, cartControllers.updateCartQuantity);
router.post('/:productId', verifyToken, cartControllers.addToCart);
router.post('/checkCartItem/:productId', verifyToken, cartControllers.checkCartItems);
router.get('/viewCartItemQuantity/:productId', verifyToken, cartControllers.viewCartItemQuantity)

module.exports = router;