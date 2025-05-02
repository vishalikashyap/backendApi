const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  price: { type: Number, required: true },
  phone: { type: String, required: true },
  category: { type: String, required: true },
  images: { type: [String], required: true }, // Array to store multiple image URLs
});

module.exports = mongoose.model("Product", productSchema);
