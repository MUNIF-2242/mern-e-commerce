const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

// API
router.get(`/`, async (req, res) => {
  const usersList = await User.find();
  res.send(usersList);
});

module.exports = router;
