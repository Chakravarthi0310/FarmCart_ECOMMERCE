const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Customer = require("../models/Customer");
const Order = require("../models/Order");
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.registerCustomer = async (req,res)=>{
    try{
        const {name,email,password,phone,address}=req.body;

        const existingCustomer = await Customer.findOne({email});
        if(existingCustomer){
            return res.status(400).json({message: "Email already exist"});
        }
        const hashedPassword= await bcrypt.hash(password,10);
        const newCustomer = new Customer({name,email,password:hashedPassword,phone,address});
        await newCustomer.save();
        res.status(201).json({message:"Customer registered successfully"});
    }catch(e){
        res.status(500).json({message:"Error registering customer", error:e.message});
        

    }
};

exports.loginCustomer = async (req,res)=>{
    try{
        const {email,password}=req.body;
        const existingCustomer = await Customer.findOne({email});
        if(!existingCustomer)
        {
            return res.status(400).json({message:"Invalid email or password"});
        }
        const isMatch= await bcrypt.compare(password,existingCustomer.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({id: existingCustomer._id,email:existingCustomer.email}, JWT_SECRET, {expiresIn:"1h"});
        res.json({message:"Login Successful",token});

    }catch(e)
    {
        res.status(500).json({message:"Error logging in the customer", error:e.message});
    }
};

// exports.getCustomerorders = async(req,res)=>{
//     try{
//         const {customerId} = req.body;
//         const orders= await Order.find({})
//     }catch(e){

//     }
// }

