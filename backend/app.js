import express from "express";
import cors from "cors";

// Initialize Express app

const app = express();

// Server port
const PORT = 5000;

// Middleware

app.use(cors());
app.use(express.json());

// In-memory product data

let products = [
  { id: 1, name: "Laptop", price: 350000 },
  { id: 2, name: "Phone", price: 180000 },
  { id: 3, name: "Headphones", price: 25000 }
];

// API routes

app.get("/", (req, res) => {
  res.send("Simple REST API is running");
});

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((item) => item.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
});

app.post("/api/products", (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    price: Number(price)
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product created successfully",
    product: newProduct
  });
});

app.put("/api/products/:id", (req, res) => {
  const product = products.find((item) => item.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, price } = req.body;

  product.name = name || product.name;
  product.price = price ? Number(price) : product.price;

  res.status(200).json({
    message: "Product updated successfully",
    product
  });
});

app.delete("/api/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  products = products.filter((item) => item.id !== productId);

  res.status(200).json({
    message: "Product deleted successfully"
  });
});

// Start the server

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});