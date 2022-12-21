const Product = require("../models/product");

const getAllProducts = async(req, res) =>{

     const {company, name, featured, sort, select} = req.query;
     const queryObject = {};

     if(company){
          queryObject.company = company;
     }
     if(featured){
          queryObject.featured = featured;
     }
     if(name){
          queryObject.name = { $regex: name, $options: "i" };
     }

     let apiData = Product.find(queryObject);

     if(sort){
          let sortFix = sort.split(",").join(" ");
          apiData = apiData.sort(sortFix);
     }
     if(select){
          let selectFix = select.split(",").join(" ");
          apiData = apiData.select(selectFix);
     }

     // *pagination
     let page = Number(req.query.page) || 1;
     let limit = Number(req.query.limit) || 10;

     let skip = (page - 1)*limit;

     apiData = apiData.skip(skip).limit(limit);

     const Products = await apiData.sort(sort);
     res.status(200).json({Products, nbHits: Products.length});
};

const getAllProductsTesting = async(req, res) =>{

    const myData = await Product.find(req.query);
     res.status(200).json({myData});
};

module.exports = { getAllProducts, getAllProductsTesting }