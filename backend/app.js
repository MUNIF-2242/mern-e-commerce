const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const { Schema } = mongoose;

require("dotenv/config");

const api = process.env.API_URL;
const mongoUri = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(morgan("tiny"));

const productSchema = new Schema({
  name: String,
  description: String,
  image: String,
  countInStock: { type: Number, required: true },
});

// Model
const Product = mongoose.model("products", productSchema);

// API
app.get(`${api}/products`, async (req, res) => {
  const productsList = await Product.find();
  res.send(productsList);
});

app.post(`${api}/products`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    countInStock: req.body.countInStock, // Added countInStock from the request body
  });

  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

// Connection
mongoose
  .connect(mongoUri, {
    dbName: "E-shop-DB",
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("app is listening on port 3000");
});
