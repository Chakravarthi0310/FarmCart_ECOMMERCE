const Product = require("../models/Product");

exports.getApprovedProducts = async (req,res)=>{
    try{
        const {category}=req.query;
        let query = {status:"Approved"};
        if(category){
            query.category=category;
        }
        const products= await Product.find(query);
        res.json(products);

    }catch(e)
    {
        res.status(500).json({message:"Error fetching products", error:e.message});
    }
};