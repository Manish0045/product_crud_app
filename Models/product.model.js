const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    description: {
        type: String
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Product category is required"]
    },
    price: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
})

const Product = mongoose.model("Product", productSchema);
module.exports = Product;