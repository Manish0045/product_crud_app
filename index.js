require("dotenv").config();
const { app } = require("./app");
const connectDB = require("./db/dbConfig");


const PORT = process.env.PORT || 8000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log("Error connecting to server", error);
})
