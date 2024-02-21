const express = require("express");
const { createCategory, getAllCategory } = require("../Controllers/category.controller")

const router = express.Router();

router
    .get('/all', getAllCategory)
    .post('/add', createCategory)

module.exports = router;