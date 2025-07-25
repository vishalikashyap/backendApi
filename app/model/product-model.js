const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: String,
  shortDescription: String,
  price: { type: Number, required: true },
  originalPrice: Number,
  discount: Number,
  stock: { type: Number, required: true },
  sku: String,
  category: String,
  brand: String,
  colors: [String],
  tags: [String],
  thumbnail: String,
  images: [String],
}, { timestamps: true });

module.exports = mongoose.model('NewProduct', productSchema);
