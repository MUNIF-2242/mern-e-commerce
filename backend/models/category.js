const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  icon: {
    type: String,
  },
  image: {
    type: String,
  },
  // createdDate: {
  //   type: Date,
  //   default: Date.now(),
  // },
  // createdBy: {
  //   type: String,
  // },
  // modifiedDate: {
  //   type: Date,
  //   default: Date.now(),
  // },
  // modifiedBy: {
  //   type: String,
  // },
});

// Model
exports.Category = mongoose.model("categories", categorySchema);
