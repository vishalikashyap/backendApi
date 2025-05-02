const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
require("dotenv").config(); // Load environment variables

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userType: userType || "user", // fallback to 'user' if not provided
    });

    // Save User
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType
      }
    });
  } catch (error) {
    console.error("Error in Register API:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


//  Login User
const loginUser = async (req, res) => {
  try {
    const { email, password} = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || "SECRET_KEY", 
      { expiresIn: "1h" }
    );

    res.json({ 
      message: "Login successful",
      token, 
      user: { id: user._id, name: user.name, email: user.email,userType:user.userType }
    });
  } catch (error) {
    console.error("Error in Login API:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { registerUser, loginUser };
