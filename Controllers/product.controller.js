const Product = require("../Models/product.model");
const Category = require("../Models/category.model");

const createProduct = async (req, res) => {
    const { name, categoryId, price, description } = req.body;
    if (!name || !categoryId || !price || !description) {
        return res.status(400).json({ msg: "Missing fields" });
    }
    try {
        let category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ msg: "Category not found." });
        }
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            res.status(401).send({
                statusCode: 401,
                message: "Product already exists"
            })
        }
        const product = await Product.create({ name, categoryId, price, description, slug: name.split(' ').join("-") });
        if (product) {
            res.status(200).send({ statusCode: 201, message: "Product created", productId: product._id });
        } else {
            res.status(404).send({ statusCode: 409, message: "Something went wrong while creating product" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getAllProducts = async (req, res) => {
    console.log("Getting all products");
    try {
        const products = await Product.find({});
        console.log(products);
        if (products) {
            res.status(200).send({
                statusCode: 200,
                message: "Successfully fetched all products",
                data: products
            })
        } else {
            res.status(200).send({
                statusCode: 200,
                message: "No products found in database",
            })
        }
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Couldn't fetch all products"
        })
    }
}

const getProductByHandle = async (req, res) => {
    const id = req.params.getByHandle;
    console.log(id);
    try {
        const product = await Product.findById(id);
        console.log(product);
        if (!product) {
            return res.status(404).json({ message: "The specified resource could not be found" });
        }
        res.status(200).send({
            statusCode: 200,
            message: "Product fetched...",
            data: product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            statusCode: 500,
            message: "Something went wrong while fetching"
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const productId = req.params.productId;
        console.log(productId);
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            res.status(404).send({
                statusCode: 404,
                message: "No product found with provided id"
            })
        }
        const updatedProduct = await Product.findByIdAndUpdate(_id = productId, { name: name, description: description, price: price }).selected("-description -slug");
        if (updatedProduct) {
            res.status(200).send({
                statusCode: 200,
                message: "Product updated successfully..!",
                updatedData: updateProduct
            })
        }
    } catch (error) {
        console.log("Error in updating the product");
        res.status(500).send({
            statusCode: 500,
            message: "Something went wrong updating the product."
        })
    }
}

module.exports = { createProduct, getAllProducts, getProductByHandle, updateProduct }