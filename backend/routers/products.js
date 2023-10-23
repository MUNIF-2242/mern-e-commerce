const express = require("express");
const multer = require("multer");
const { Product } = require("../models/product");
const { Category } = require("../models/category");
const router = express.Router();

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/upload");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

// API

// API to get a list of all products
router.get("/", async (req, res) => {
  try {
    let query = {}; // Initialize an empty query object

    // Check if the 'categories' query parameter is provided
    if (req.query.categories) {
      // If 'categories' is provided, split it by comma to support multiple categories
      const categories = req.query.categories.split(",");
      query.category = { $in: categories };
    }

    // Execute the query with the filters
    const productsList = await Product.find(query).populate("category");

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
    res.status(200).json({ success: true, productCount: productCount });
  } catch (err) {
    // Handle any errors that may occur during the countDocuments operation
    res.status(500).json({ success: false, error: err.message });
  }
});

// API to get the featured products
router.get("/get/featured", async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true });
    res.status(200).json({ success: true, products });
  } catch (err) {
    // Handle any errors that may occur during the countDocuments operation
    res.status(500).json({ success: false, error: err.message });
  }
});

// API to get the featured products with count parameter
router.get("/get/featured/:count", async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  try {
    const products = await Product.find({ isFeatured: true }).limit(+count);
    res.status(200).json({ success: true, products });
  } catch (err) {
    // Handle any errors that may occur during the countDocuments operation
    res.status(500).json({ success: false, error: err.message });
  }
});

// API to create a new product
router.post("/", uploadOptions.single("image"), async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(400).send("Invalid Category");
    }

    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/upload`;

    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: `${basePath}/${fileName}`,
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
