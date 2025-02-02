const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Farmer = require("../models/Farmer");
const Product = require("../models/Product");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.registerFarmer = async(request, res) => {
    try {
        const { name, password, phone, address } = request.body;
        const existingFarmer = await Farmer.findOne({ phone });
        if (existingFarmer) {
            return res.status(400).json({ message: "User with this phone numnber already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newFarmer = new Farmer({
            name,
            password: hashedPassword,
            phone,
            address,
        });
        await newFarmer.save();
        res.status(201).json({ message: "Farmer registered successfully" });
    } catch (e) {
        res.status(500).json({ message: "error registering farmer", error: e.message });
    }
}

exports.loginFarmer = async(req, res) => {
    try {
        const { phone, password } = req.body;
        const farmer = await Farmer.findOne({ phone });
        if (!farmer) {
            return res.status(200).json({ message: "Farmer not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, farmer.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: farmer._id, phone:farmer.phone }, JWT_SECRET, { expiresIn: "1h" });
       
        res.json({
            message: "Login Successful",
            token,
            farmer: {
                id: farmer._id,
                name: farmer.name,
                phone: farmer.phone,
                address: farmer.address,
            },
        });

    } catch (e) {
        res.status(500).json({ message: "Error logging in farmer", error: e.message });
    }
};



exports.updateFarmerProfile = async (req, res) => {
  try {
    const farmerId = req.customer.id; // Extracted from JWT authentication middleware
    const { name,phone, address } = req.body;

    console.log("Updating profile for farmer:", farmerId);

    const farmer = await Farmer.findById(farmerId);

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    if (name) farmer.name = name;
    if (phone) farmer.phone = phone;
    if (address) farmer.address = address;

    await farmer.save();

    res.status(200).json({ message: "Farmer profile updated successfully", farmer });
  } catch (error) {
    console.error("Update farmer profile error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
//Add Products

exports.viewOwnProducts = async(req, res) => {
    try {
        const farmerId = req.customer.id;
        // Assuming `req.farmer.id` is populated via JWT middleware
        const products = await Product.find({ farmer: farmerId });
        res.status(200).json({ products });

    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });

    }
};

//Add Product
exports.addProduct = async (req, res) => {
    try {
        const farmerId = req.customer.id;
        const { name, category, marketRate, price, quantity, expiryDate } = req.body;

        // Validate required fields
        if (!name || !category || !marketRate || !price || !quantity || !expiryDate) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newProduct = new Product({
            name,
            category,
            marketRate,
            price,
            quantity,
            expiryDate,
            farmer: farmerId,
            status: "Pending",
            ratings: 0,
            reviews: []
        });

        // Handle image upload (if provided)
        if (req.file) {
            newProduct.image = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }

        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });

    } catch (e) {
        res.status(500).json({ message: "Error adding product", error: e.message });
    }
};


//View Orders
exports.viewOrders = async(req, res) => {
    try {
        const farmerId = req.customer.id; 
        const orders = await Order.find({
                "products.product": {
                    $in: await Product.find({ farmer: farmerId }).select("_id")
                }
            }).populate("customer", "name email phone address")
            .populate("products.product", "name category price");
        res.status(200).json({ orders });
    } catch (e) {
        res.status(500).json({ message: "Error fetching orders", message: e.message });

    }
};


//Update order status
exports.updateOrderStatus = async(req,res)=>{
    try{
        const {orderId, status}=req.body;
        const allowedStatuses = ["Processing","Shipped","Delivered","Cancelled"];
        if(!allowedStatuses.includes(status)){
            return res.status(400).json({message:"Invalid order status"})
        }
        const order = await Order.findByIdAndUpdate(orderId,{status},{new:true}).populate("products.product");
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        const products=order.products;
        if(status=="Delivered")
        {
            for(let item of products)
            {
                const product = await Product.findById(item.product);
                if (!product) {
                    return res.status(400).json({ message: `Product ${item.product} not found` });
                }

                // Reduce stock only if there is enough quantity
                if (product.quantity >= item.quantity) {
                    product.quantity -= item.quantity;
                    await product.save();
                } else {
                    return res.status(400).json({ message: `Not enough stock for product ${product.name}` });
                }
            }
        }
        res.status(200).json({message:"Order status updated successfully",order});

    }catch(e){
        res.status(500).json({message:"Error updating order status",error:e.message});

    }
};