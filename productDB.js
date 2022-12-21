require("dotenv").config();
const connectDB = require("./db/connect");
const product = require("./models/product");

const ProductaJson = require("./products.json");

const start = async () => {
    try{
      await connectDB(process.env.MONGODB_URL);
      await product.deleteMany();
      await product.create(ProductaJson);
      console.log("success");
    }catch(error){
       console.log(error);
    }
};

start();