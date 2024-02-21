const mongoose = require("mongoose");

MONGO_URL = process.env.MONGO_URI + "product_crud_application";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(MONGO_URL);
        console.log(`MongoDB Connected: \nHOST: ${connectionInstance.connection.host} DATABASE: ${connectionInstance.connection.name}`);
    } catch (error) {
        console.log("Erro while connecting to mongoDB....!", error);
    }
}
module.exports = connectDB;