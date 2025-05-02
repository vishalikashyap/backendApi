const Checkout = require('../model/checkout');
const shortid = require('shortid');

const createCheckout = async (req, res) => {
  try {
    const orderId = `ORD-${shortid.generate().toUpperCase()}`;

    const newOrder = new Checkout({
      orderId: orderId,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      orderSummary: req.body.orderSummary,
      total: req.body.total
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: 'Duplicate orderId, please try again.' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
const getAllCheckouts = async (req, res) => {
  try {
    const checkouts = await Checkout.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(checkouts);
  } catch (error) {
    console.error('Error fetching checkouts:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

module.exports = {
  createCheckout ,getAllCheckouts
};
