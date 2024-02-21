const Product = require("../Models/product.model");
const Category = require("../Models/category.model");

const createProduct = async (req, res) => {
    let i = 1;
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
            return res.status(401).json({
                statusCode: 401,
                message: "Product already exists"
            })
        }
        const product = await Product.create({ name, categoryId, price, description, slug: existingProduct.slug ? name.split(' ').join("-") + "-" + (i + 1) : name.split(' ').join("-") + i + 1 });
        if (product) {
            return res.status(200).json({ statusCode: 201, message: "Product created", productId: product._id });
        } else {
            return res.status(404).json({ statusCode: 409, message: "Something went wrong while creating product" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getAllProducts = async (req, res) => {
    console.log("Getting all products");
    try {
        const products = await Product.find({});
        console.log(products);
        if (products) {
            return res.status(200).json({
                statusCode: 200,
                message: "Successfully fetched all products",
                data: products
            })
        } else {
            return res.status(200).json({
                statusCode: 200,
                message: "No products found in database",
            })
        }
    } catch (error) {
        return res.status(500).json({
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
        res.status(200).json({
            statusCode: 200,
            message: "Product fetched...",
            data: product
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
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
            return res.status(404).json({
                statusCode: 404,
                message: "No product found with provided id"
            })
        }
        else {
            // Update the fields of the existing product
            existingProduct.name = name || existingProduct.name;
            existingProduct.price = price || existingProduct.price;
            existingProduct.description = description || existingProduct.description;
            const updatedProduct = await existingProduct.save();
            if (updatedProduct) {
                return res.status(200).json({
                    statusCode: 200,
                    message: "Product updated successfully..!",
                    updatedData: updateProduct
                })
            } else {
                return res.status(204).json({
                    statusCode: 204,
                    message: "No product updated ..!"
                })
            }
        }
    } catch (error) {
        console.log("Error in updating the product");
        return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong updating the product."
        })
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.productId;
    try {
        let deletedProduct = await Product.findByIdAndDelete({ _id: id });
        if (!deletedProduct) {
            return res.status(404).json({
                statusCode: 404,
                message: "The specified resource could not be found."
            })
        } else {
            return res.status(200).json({
                statusCode: 200,
                message: "Product deleted successfully.",
                deletedId: deleteProduct._id
            })
        }
    } catch (error) {
        console.log("Error while deleting product", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong deleting the product"
        })
    }
}

module.exports = { createProduct, getAllProducts, getProductByHandle, updateProduct, deleteProduct }