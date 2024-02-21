const Category = require("../Models/category.model");
const Product = require("../Models/product.model");

const getAllCategory = async (_, res) => {
    console.log("Getting all categories");
    try {
        const categories = await Category.find({});
        console.log(categories);
        if (categories) {
            res.status(200).send({
                statusCode: 200,
                message: "Successfully fetched all categories",
                data: categories
            })
        } else {
            res.status(200).send({
                statusCode: 200,
                message: "No Categories found in database",
            })
        }
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Couldn't fetch all categories"
        })
    }
}

const createCategory = async (req, res) => {
    try {
        console.log("Creating Category");
        const { name, description, productId } = req.body;
        if (!(name || description)) return res.status(400).json({ message: "Please provide category name and description." });
        let product = await Product.findById(productId);
        if (!product) {
            const category = await Category.create({ name: name, description: description });
            if (category) {
                res.status(201).send({
                    statusCode: 201,
                    message: "Category added successfully",
                    id: category._id
                })
            }
            // res.status(404).send({
            //     statusCode: 404,
            //     message: 'Product not Found!'
            // });
        } else {
            const category = await Category.create({ name: name, descripion: descripion, productId: productId })
            if (category) {
                res.status(201).send({
                    statusCode: 201,
                    message: "Category added successfully",
                    id: category._id
                })
            }
        }

    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Error while creating category",
            error: error.message
        })
    }
}

module.exports = { createCategory, getAllCategory }