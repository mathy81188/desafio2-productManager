import express from "express";
import ProductManager from "./ProductManager.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    const product = ProductManager.getProductById(req.query);
    if (!product.length) {
      return res.status(200).json({ message: "No products" });
    }
    res.status(200).json({ message: "Products found", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = ProductManager.getProductById(+pid);
    if (!product) {
      res.status(400).json({ message: "Product not found with the id" });
    }
    res.status(200).json({ message: "Product found", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(8080, () => {
  console.log("escuchando puerto 8080");
});
