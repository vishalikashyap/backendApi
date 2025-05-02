

const express = require('express');
const router = express.Router();
const { createCheckout ,getAllCheckouts} = require('../controllers/checkoutController');

router.post('/place-order', createCheckout);
router.get('/order', getAllCheckouts);
module.exports = router;
