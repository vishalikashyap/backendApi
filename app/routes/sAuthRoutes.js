const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/suser');
const router = express.Router();

// POST /api/auth/login-or-signup
router.post('/login-or-signup', async (req, res) => {
  const { email, password } = req.body;
 
  try {
    let user = await User.findOne({ email });

    if (user) {
      // User exists, check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      // If credentials match, generate and return token
      const token = jwt.sign({ id: user._id },  (process.env.JWT_SECRET  || "SECRET_KEY"), { expiresIn: '1d' });
      return res.json({ message: 'Logged in successfully', token, user });
    } else {
      // User does not exist, create a new user and log them in
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ email, password: hashedPassword });
      await user.save();

      // After registering, generate the token
      const token = jwt.sign({ id: user._id }, (process.env.JWT_SECRET  || "SECRET_KEY"), { expiresIn: '1d' });
      return res.json({ message: 'Registration successful and logged in', token, user });
    }
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
