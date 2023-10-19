const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

// API
router.get(`/`, async (req, res) => {
  const usersList = await User.find();
  res.status(200).send({ success: true, usersList });
});

// create a User
router.post(`/`, async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
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
