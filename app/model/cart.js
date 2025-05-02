const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  price: { type: Number, required: true },
  phone: { type: String, required: true },
  images: { type: [String], required: true},
  quantity: { type: Number, required: true, default: 1 },
});

module.exports = mongoose.model("Cart", CartSchema);
