const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();

// API

router.get(`/`, async (req, res) => {
  const categoriesList = await Category.find();
  res.send(categoriesList);
});

module.exports = router;
