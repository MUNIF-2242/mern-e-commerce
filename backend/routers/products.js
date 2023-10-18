const express = require("express");
const { Product } = require("../models/product");
const router = express.Router();

// API

router.get(`/`, async (req, res) => {
  const productsList = await Product.find();
  res.send(productsList);
});

router.post(`/`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    countInStock: req.body.countInStock, // Added countInStock from the request body
  });

  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

module.exports = router;
