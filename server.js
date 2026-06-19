require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
 
const authRoutes = require("./routes/authRoutes");

const productRoutes =require("./routes/productRoutes");

const orderRoutes =require("./routes/orderRoutes");



connectDB();


const app = express();



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); 

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 Street E-Commerce Server is Running...");
});


//products

app.get("/api/products", (req, res) => {

  const products = [
    {
      id: 1,
      name: "Classic T-Shirt",
      price: 499,
      image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
    },
    {
      id: 2,
      name: "Premium Hoodie",
      price: 999,
      image:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600"
    },
    {
      id: 3,
      name: "Sports Shoes",
      price: 1499,
      image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
    }
  ];

  res.json(products);

});

// Server Port
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

