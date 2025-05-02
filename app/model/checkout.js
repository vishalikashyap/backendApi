const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  fullName: String,
  email: String,
  phone: String,
  shippingAddress: String,
  paymentMethod: String,
  orderSummary: [
    {
      name: String,
      price: Number,
    }
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Checkout', checkoutSchema);
