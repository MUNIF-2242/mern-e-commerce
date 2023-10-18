const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({});

// Model
exports.Category = mongoose.model("categories", categorySchema);
