const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({});

// Model
exports.User = mongoose.model("users", userSchema);
