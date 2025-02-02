const Farmer = require("../models/Farmer");
const Product = require("../models/Product");
const Admin = require("../models/Admin");
const Customer = require("../models/Customer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.registerAdmin = async (req, res) => {
<<<<<<< HEAD
    try {
        const { email, password } = req.body;

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ email, password: hashedPassword });
        await newAdmin.save();
        res.status(201).json({ message: "Admin Registered successfully" });

    } catch (e) {
        res.status(500).json({ message: "Error registering admin", error: e.message });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Admin Login Successful", token });
    } catch (e) {
        res.status(500).json({ message: "Error logging in", error: e.message });
    }
=======
 try {
const { email, password } = req.body;

const existingAdmin = await Admin.findOne({ email });
 if (existingAdmin) {
 return res.status(400).json({ message: "Email already exists" });
}

 const hashedPassword = await bcrypt.hash(password, 10);
 const newAdmin = new Admin({ email, password: hashedPassword });
await newAdmin.save();
 res.status(201).json({ message: "Admin Registered successfully" });

 } catch (e) {
 res.status(500).json({ message: "Error registering admin", error: e.message });
}
};

exports.loginAdmin = async (req, res) => {
 try {
 const { email, password } = req.body;
 const admin = await Admin.findOne({ email });
 if (!admin) {
  return res.status(400).json({ message: "Invalid credentials" });
 }
 const isMatch = await bcrypt.compare(password, admin.password);
 if (!isMatch) {
  return res.status(400).json({ message: "Invalid credentials" });
 }
 const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: "1h" });
 res.json({ message: "Admin Login Successful", token });
 } catch (e) {
 res.status(500).json({ message: "Error logging in", error: e.message });
 }
};

exports.changeStatusFarmer = async (req, res) => {
    try {
        const { id, verificationStatus } = req.body;
<<<<<<< HEAD
        if (!["Approved", "Rejected"].includes(verificationStatus)) {
            return res.status(400).json({ error: "Invalid verification status" });
        }

        const farmer = await Farmer.findByIdAndUpdate(
            id,
            { verificationStatus },
            { new: true }
        );

        if (!farmer) {
            return res.status(404).json({ error: "Farmer not found" });
        }

        res.status(200).json({ message: `Farmer ${verificationStatus} successfully`, farmer });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.changeStatusProduct = async (req, res) => {
    try {
        const { id, status } = req.body;
        if (!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid product status" });
        }

        const product = await Product.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: `Product ${status} successfully`, product });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getAllFarmers = async (req, res) => {
    try {
        const farmers = await Farmer.find();
        res.status(200).json(farmers);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("farmer", "name email");
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
=======
        if (!["approved", "rejected"].includes(verificationStatus)) {
            return res.status(400).json({ error: "Invalid verification status" });
        }

 const farmer = await Farmer.findByIdAndUpdate(
  id,
  { verificationStatus },
  { new: true }
 );

if (!farmer) {
 return res.status(404).json({ error: "Farmer not found" });
}

 res.status(200).json({ message: `Farmer ${verificationStatus} successfully`, farmer });
 } catch (error) {
res.status(500).json({ error: "Internal server error" });
}
};

exports.changeStatusProduct = async (req, res) => {
try {
 const { id, status } = req.body;
 if (!["Approved", "Rejected"].includes(status)) {
  return res.status(400).json({ error: "Invalid product status" });
 }
 const product = await Product.findByIdAndUpdate(
 id,
 { status },
 { new: true }
 );
  if (!product) {
  return res.status(404).json({ error: "Product not found" });
  }
  res.status(200).json({ message: `Product ${status} successfully`, product });
 } catch (error) {
  res.status(500).json({ error: "Internal server error" });
 }
};

exports.getAllFarmers = async (req, res) => {
 try {
  const farmers = await Farmer.find();
  res.status(200).json(farmers);
 } catch (error) {
  res.status(500).json({ error: "Internal server error" });
 }
};

exports.getAllProducts = async (req, res) => {
try {
 const products = await Product.find().populate("farmer", "name email");
 res.status(200).json(products);
} catch (error) {
 res.status(500).json({ error: "Internal server error" });
}
};

exports.getAllCustomer = async(req,res)=>{
    try{
        const customers=await Customer.find();
        res.status(200).json(customers);
    }catch(e){
        res.status(500).json({error:e.message});
    }
}