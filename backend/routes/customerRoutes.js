const express = require("express");
const {registerCustomer,loginCustomer, updateCustomerProfile,getCustomerOrders}=require("../controllers/customerController");
const {getApprovedProducts}=require("../controllers/productController");
const {placeOrder}=require("../controllers/orderController");
const {authMiddleware}= require("../middlewares/authMiddleware");

const router=express.Router();

router.post("/register",registerCustomer);
router.post("/login",loginCustomer);
router.get("/products",authMiddleware,getApprovedProducts);
router.post("/order",authMiddleware,placeOrder);
router.get("/order",authMiddleware,getCustomerOrders);
router.put("/profile",authMiddleware,updateCustomerProfile)

module.exports = router;