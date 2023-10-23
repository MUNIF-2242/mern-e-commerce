const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
//const cors = require("cors");

require("dotenv/config");

const api = process.env.API_URL;
const mongoUri = process.env.MONGO_URI;

const productsRouter = require("./routers/products");
const categoriesRouter = require("./routers/categories");
const ordersRouter = require("./routers/orders");
const usersRouter = require("./routers/users");

// Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);
app.use("/public/upload", express.static(__dirname + "/public/upload"));
//app.use(cors());
//app.options("*", cors);

//Routers
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, usersRouter);

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
