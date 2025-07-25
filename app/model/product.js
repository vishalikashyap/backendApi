const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 }, 
  phone: { type: String, required: true },
  category: { type: String, required: true },
  images: { type: [String], required: true },
  shortDescription: { type: String }, 
  description: { type: String }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
