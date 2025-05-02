const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../model/User");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
