const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

// register a User only admin can do that
router.post(`/register`, async (req, res) => {
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

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const secretKey = process.env.SECRET_KEY;

  // Find the user by email
  const user = await User.findOne({ email });

  if (user) {
    // Verify the password
    if (bcrypt.compareSync(password, user.password)) {
      // Password is correct
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin,
        },
        secretKey, // Replace with your secret key for JWT
        { expiresIn: "1h" } // You can set the expiration time as per your requirements
      );

      res.status(200).json({ success: true, user, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid password" });
    }
  } else {
    res.status(404).json({ success: false, message: "User not found" });
  }
});
module.exports = router;
