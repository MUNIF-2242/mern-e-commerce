const express = require("express");
const { Order } = require("../models/order");
const router = express.Router();

// API
router.get(`/`, async (req, res) => {
  const ordersList = await Order.find();
  res.send(ordersList);
});

module.exports = router;
