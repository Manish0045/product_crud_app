const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const productRoutes = require("./Routes/product.route");
const categoryRoutes = require("./Routes/category.route");

app.use('/category', categoryRoutes);
app.use("/product", productRoutes);

module.exports = { app };