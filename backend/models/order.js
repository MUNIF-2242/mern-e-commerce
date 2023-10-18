const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: String,
  },
  modifiedDate: {
    type: Date,
  },
  modifiedBy: {
    type: String,
  },
});

// Model
exports.Order = mongoose.model("orders", orderSchema);
