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

// Create a virtual 'id' field
categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

categorySchema.set("toJSON", {
  virtuals: true,
});

// Model
exports.Category = mongoose.model("Category", categorySchema);
