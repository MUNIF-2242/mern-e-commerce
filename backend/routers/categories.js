const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();

// API

router.get(`/`, async (req, res) => {
  const categoriesList = await Category.find();
  res.status(200).send(categoriesList);
});

// Get a category by ID
router.get("/:id", async (req, res) => {
  const categoryId = req.params.id;

  try {
    // Find the category by ID
    const category = await Category.findById(categoryId);

    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the category" });
  }
});

router.post(`/`, async (req, res) => {
  let category = new Category({
    name: req.body.name,
    color: req.body.color,
    icon: req.body.icon,
    image: req.body.image,
  });

  category = await category.save();
  if (!category) {
    return res.status(404).send("The Category can not be created");
  }
  res.send(category);
});

router.delete("/:id", async (req, res) => {
  const categoryId = req.params.id;

  try {
    // Find the category by ID and remove it
    const deletedCategory = await Category.findByIdAndRemove(categoryId);

    if (deletedCategory) {
      res
        .status(200)
        .json({ message: "Category deleted successfully", success: true });
    } else {
      res.status(404).json({ message: "Category not found", success: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the category" });
  }
});

module.exports = router;
