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

// API to get the count of products
router.get("/get/count", async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    res.status(200).json({ success: true, count: productCount });
  } catch (err) {
    // Handle any errors that may occur during the countDocuments operation
    res.status(500).json({ success: false, error: err.message });
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

// Update a product by ID
router.put("/:id", async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send("Invalid Category");
  }

  const productId = req.params.id;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
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
      },
      { new: true }
    );

    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the product" });
  }
});

// Delete a product by ID
router.delete("/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    // Find the category by ID and remove it
    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (deletedProduct) {
      res
        .status(200)
        .json({ message: "Product deleted successfully", success: true });
    } else {
      res.status(404).json({ message: "Product not found", success: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the Product" });
  }
});

module.exports = router;
