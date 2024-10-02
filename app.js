const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.uss(cors());

// Routes
const productRoutes = require("./Routes/product.route");
const categoryRoutes = require("./Routes/category.route");
const mailRoutes = require("./Routes/mail.route");

app.use('/category', categoryRoutes);
app.use("/product", productRoutes);
app.use('/mail', mailRoutes);

module.exports = { app };