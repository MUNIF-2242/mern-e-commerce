const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  description: String,
  image: String,
  countInStock: { type: Number, required: true },
});

// Model
exports.Product = mongoose.model("products", productSchema);
