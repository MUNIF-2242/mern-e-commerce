const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    default: "",
  },
  apartment: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  zip: {
    type: String,
    default: "",
  },

  country: {
    type: String,
    default: "",
  },
  phone: {
    type: Number,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    required: true,
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
  // },
  // modifiedBy: {
  //   type: String,
  // },
});

// Create a virtual 'id' field
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

// Model
exports.User = mongoose.model("User", userSchema);
