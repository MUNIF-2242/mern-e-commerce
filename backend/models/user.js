const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
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
exports.User = mongoose.model("User", userSchema);
