const express = require("express");
const router = express.Router();
const { createProduct, getAllProducts, getProductByHandle, updateProduct, deleteProduct } = require("../Controllers/product.controller");

router
    .get('/products', getAllProducts)
    .get('/:getByHandle', getProductByHandle)
    .post('/add', createProduct)
    .post('/addProducts', (req, res) => { })
    .put('/update/:productId', updateProduct)
    .delete('/delete/:productId', deleteProduct)

module.exports = router;