const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const productRoutes = require("./Routes/product.route");
const categoryRoutes = require("./Routes/category.route");
const mailRoutes = require("./Routes/mail.route");

app.use('/category', categoryRoutes);
app.use("/product", productRoutes);
app.use('/mail', mailRoutes);


app.use('/', (req, res) => {
    res.status(200).json({
        statusCode: 200,
        message: "API is working ... ! Head to other routes to get data...!"
    });
});


app.use((err, req, res, next) => {
    if (err) {
        console.log(err.stack);
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                statusCode: 400,
                message: "Invalid Input",
                error: err.message
            });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = { app };
