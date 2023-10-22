const express = require("express");
const { Order } = require("../models/order");
const { OrderItem } = require("../models/order-item");
const router = express.Router();

// API
// Get all orders
router.get(`/`, async (req, res) => {
  const ordersList = await Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });
  res.send(ordersList);
});

//Get order details
router.get(`/:id`, async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    });
  res.send(order);
});

// create a order
router.post(`/`, async (req, res) => {
  const orderItemsPromises = req.body.orderItems.map(async (orderItem) => {
    const newOrderItem = new OrderItem({
      quantity: orderItem.quantity,
      product: orderItem.product,
    });
    return newOrderItem.save();
  });

  try {
    const orderItems = await Promise.all(orderItemsPromises);
    const orderItemsIds = orderItems.map((orderItem) => orderItem._id);

    const order = new Order({
      orderItems: orderItemsIds,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      totalPrice: req.body.totalPrice,
      phone: req.body.phone,
      status: req.body.status,
      user: req.body.user,
    });

    const savedOrder = await order.save();
    res.send(savedOrder);
  } catch (error) {
    // Handle the error (e.g., return a response indicating a problem).
    console.error(error);
    res.status(500).send("An error occurred while creating the order.");
  }
});

// Update a order by ID
router.put("/:id", async (req, res) => {
  const orderId = req.params.id;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        status: req.body.status,
      },
      { new: true }
    );

    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the order" });
  }
});

// Delete a order by ID
router.delete("/:id", async (req, res) => {
  const orderId = req.params.id;

  try {
    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }

    // Find and remove the associated order items
    const orderItems = order.orderItems;
    const deleteOrderItemsPromises = orderItems.map(async (orderItemId) => {
      return OrderItem.findByIdAndRemove(orderItemId);
    });

    await Promise.all(deleteOrderItemsPromises);

    // Delete the order itself
    const deletedOrder = await Order.findByIdAndRemove(orderId);

    if (deletedOrder) {
      res
        .status(200)
        .json({ message: "Order deleted successfully", success: true });
    } else {
      res.status(404).json({ message: "Order not found", success: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the order" });
  }
});

module.exports = router;
