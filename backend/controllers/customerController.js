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
        console.log("The registration data is good");

        const hashedPassword= await bcrypt.hash(password,10);
        const newCustomer = new Customer({name,email,password:hashedPassword,phone,address});
        await newCustomer.save();
        res.status(201).json({
          message: "Customer registered successfully",
          token,
          customer: {
              id: newCustomer._id,
              name: newCustomer.name,
              email: newCustomer.email,
              phone: newCustomer.phone,
              address: newCustomer.address,
          },
      });
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
        res.json({
            message: "Login Successful",
            token,
            customer: {
                id: existingCustomer._id,
                name: existingCustomer.name,
                email: existingCustomer.email,
                phone: existingCustomer.phone,
                address: existingCustomer.address,
            },
        });
    }catch(e)
    {
        res.status(500).json({message:"Error logging in the customer", error:e.message});
    }
};


exports.getCustomerOrders = async (req, res) => {
    try {
      const customerId = req.customer.id; // Extracted from JWT authentication middleware
  
      console.log("Fetching orders for customer:", customerId);
  
      const orders = await Order.find({ customer: customerId, status:"Approved" }).populate("products.product");
  
      if (!orders.length) {
        return res.status(404).json({ message: "No orders found for this customer" });
      }
  
      res.status(200).json({ message: "Orders fetched successfully", orders });
    } catch (error) {
      console.error("Error fetching customer orders:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };


exports.updateCustomerProfile = async (req, res) => {
    try {
      const customerId = req.customer.id; // Extracted from JWT authentication middleware
      const { name,email, phone, address } = req.body;
  
      console.log("Updating profile for customer:", customerId);
  
      const customer = await Customer.findById(customerId);
  
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
  
      if (name) customer.name = name;
      if (email) customer.email = email;
      if (phone) customer.phone = phone;
      if (address) customer.address = address;
  
      await customer.save();
  
      res.status(200).json({ message: "Customer profile updated successfully", customer });
    } catch (error) {
      console.error("Update customer profile error:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

// exports.getCustomerorders = async(req,res)=>{
//     try{
//         const {customerId} = req.body;
//         const orders= await Order.find({})
//     }catch(e){

//     }
// }

