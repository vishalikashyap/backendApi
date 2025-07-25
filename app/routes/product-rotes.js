const express = require('express');
const router = express.Router();
const Product = require('../model/product-model');
const multer = require('multer');
const path = require('path');

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // local folder
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// CREATE product with images
router.post('/create/products', upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]), async (req, res) => {
  try {
    const { body, files } = req;

    const productData = {
      ...body,
      thumbnail: files?.thumbnail ? files.thumbnail[0].filename : '',
      images: files?.images ? files.images.map(f => f.filename) : []
    };

    const product = new Product(productData);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all products
router.get('/fetch/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE product by ID
router.delete('/delete/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE product by ID
router.put('/update/products/:id', upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]), async (req, res) => {
  try {
    const { body, files } = req;

    const updatedFields = {
      ...body,
    };

    if (files?.thumbnail) updatedFields.thumbnail = files.thumbnail[0].filename;
    if (files?.images) updatedFields.images = files.images.map(f => f.filename);

    const updated = await Product.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
