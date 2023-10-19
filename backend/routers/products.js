const express = require("express");
const { Product } = require("../models/product");
const { Category } = require("../models/category");
const router = express.Router();

// API

// API to get a list of all products
router.get("/", async (req, res) => {
  try {
    //const productsList = await Product.find().select("name -_id isFeatured");//for remove attributes
    //const productsList = await Product.find().populate("category");
    const productsList = await Product.find();

    res.send(productsList);
  } catch (error) {
    return res.status(500).send("Error getting products");
  }
});

// API to get a product by ID
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).send("Product ID is missing");
    }

    const product = await Product.findById(productId).populate("category");
    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Error getting the product: ${error.message}`);
  }
});

// API to create a new product
router.post("/", async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(400).send("Invalid Category");
    }

    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    });

    product = await product.save();

    if (!product) {
      return res.status(500).send("The product cannot be created");
    }

    res.send(product);
  } catch (error) {
    return res.status(500).send("An error occurred while creating the product");
  }
});

module.exports = router;
