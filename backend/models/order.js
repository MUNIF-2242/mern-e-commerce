const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({});

// Model
exports.Order = mongoose.model("orders", orderSchema);
