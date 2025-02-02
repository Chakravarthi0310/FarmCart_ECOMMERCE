const express = require("express");
const {registerFarmer,loginFarmer,viewOwnProducts, addProduct, viewOrders, updateOrderStatus} = require("../controllers/farmerController");
const {authMiddleware}=require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register",registerFarmer);
router.post("/login",loginFarmer);
router.get("/products",authMiddleware,viewOwnProducts);
router.post("/products",authMiddleware,addProduct);
router.get("/orders",authMiddleware,viewOrders);
router.put("/orders",authMiddleware,updateOrderStatus);

module.exports = router;