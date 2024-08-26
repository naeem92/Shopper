const port = process.env.PORT;

require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Image Storage Engine
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'upload/images'),
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

// Static Files
app.use("/images", express.static(path.join(__dirname, "upload/images")));

// API Endpoints
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Example Product schema
const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
  })
);

// Example route for adding a product
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

  try {
    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    await product.save();
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
});

// Listening on the assigned port
app.listen(port, (error) => {
  if (!error) {
    console.log("Server is running on port " + port);
  } else {
    console.log("Error starting server: " + error);
  }
});
