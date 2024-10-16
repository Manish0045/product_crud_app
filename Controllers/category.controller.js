const Category = require("../Models/category.model");
const Product = require("../Models/product.model");

const getAllCategory = async (_, res) => {
    console.log("Getting all categories");
    try {
        const categories = await Category.find({});
        console.log("Categories found:", categories);
        if (categories.length > 0) {
            return res.status(200).json({
                statusCode: 200,
                message: "Successfully fetched all categories",
                data: categories
            });
        } else {
            return res.status(200).json({
                statusCode: 200,
                message: "No Categories found in database",
            });
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Couldn't fetch all categories",
            error: error.message
        });
    }
};


const createCategory = async (req, res) => {
    try {
        console.log("Creating Category");
        const { name, description, productId } = req.body;
        if (!(name || description)) return res.status(400).json({ message: "Please provide category name and description." });
        let product = await Product.findById(productId);
        if (!product) {
            const category = await Category.create({ name: name, description: description });
            if (category) {
                res.status(201).json({
                    statusCode: 201,
                    message: "Category added successfully",
                    id: category._id
                })
            }
            // res.status(404).json({
            //     statusCode: 404,
            //     message: 'Product not Found!'
            // });
        } else {
            const category = await Category.create({ name: name, descripion: descripion, productId: productId })
            if (category) {
                res.status(201).json({
                    statusCode: 201,
                    message: "Category added successfully",
                    id: category._id
                })
            }
        }

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Error while creating category",
            error: error.message
        })
    }
}

module.exports = { createCategory, getAllCategory }