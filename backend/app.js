const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

require("dotenv/config");

const api = process.env.API_URL;
const mongoUri = process.env.MONGO_URI;

//Middleware
app.use(express.json());
app.use(morgan("tiny"));

app.get(`${api}/products`, (req, res) => {
  const products = {
    id: 1,
    name: "comb",
    image: "image url",
  };
  res.send(products);
});

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.post(`${api}/products`, (req, res) => {
  const newProducts = req.body;

  res.send(newProducts);
});

app.listen(3000, () => {
  console.log("appp is listing on port 3000");
});
