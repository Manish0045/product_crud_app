const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const productRoutes = require("./Routes/product.route");
const categoryRoutes = require("./Routes/category.route");
const mailRoutes = require("./Routes/mail.route");

app.use('/category', categoryRoutes);
app.use("/product", productRoutes);
app.use('/mail', mailRoutes);

module.exports = { app };