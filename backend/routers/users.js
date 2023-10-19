const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const router = express.Router();

// API
router.get(`/`, async (req, res) => {
  const usersList = await User.find();
  res.status(200).send({ success: true, usersList });
});

// Get a user by ID
router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the category by ID
    const user = await User.findById(userId).select("-password");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the user" });
  }
});

// create a User
router.post(`/`, async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    street: req.body.street,
    apartment: req.body.apartment,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
  });

  user = await user.save();
  if (!user) {
    return res.status(404).send("User can not be created");
  }
  res.send(user);
});

module.exports = router;
