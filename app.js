require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://restfull:restfull123@restfulllearing.c2tsl.mongodb.net/RestFullLearing?retryWrites=true&w=majority",{
     useNewUrlParser: true,
     useUnifiedTopology: true,
    }
  )
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.log(" MongoDB Connection Failed:", err));

// Allow Multiple Origins
const allowedOrigins = ["http://localhost:4200", "http://localhost:62249","https://sending-love.vercel.app","https://angular19-project-blond.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

// Handle Preflight Requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).json({});
  }
  next();
});

// Middleware
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Logging incoming requests
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Serve uploaded images
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const studentRoutes = require("./app/routes/student");
const facultyRoutes = require("./app/routes/faculty");
const authRoutes = require("./app/routes/authRoutes");
const productRoutes = require("./app/routes/product");
const cartRoutes = require("./app/routes/cartRoutes");
const checkoutRoutes = require('./app/routes/checkout');
const paymentRoutes = require('./app/routes/payment');
const userRoutes = require("./app/routes/authRoutes");
const sAuthRoutes = require("./app/routes/sAuthRoutes");

// Define API Routes
app.use("/api/auth", authRoutes);
app.use("/api/sauth", sAuthRoutes);
app.use("/student", studentRoutes);
app.use("/faculty", facultyRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/v1/paypal', paymentRoutes);
app.use("/api/users", userRoutes);

// Default root route
app.get("/", (req, res) => {
  res.send("Backend API is working ✅");
});

// 404 Fallback
app.use((req, res, next) => {
  res.status(404).json({ error: "Bad Request - Route Not Found" });
});

module.exports = app;
