const express = require("express");
const router = express.Router();

const {
    registerAdmin,
    loginAdmin,
    changeStatusFarmer,
    changeStatusProduct,
    getAllFarmers,
    getAllProducts,
    getAllCustomer
} = require("../controllers/adminController");

const {authMiddleware}=require("../middlewares/authMiddleware");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.put("/farmer", authMiddleware,changeStatusFarmer);
router.put("/product",authMiddleware, changeStatusProduct);
router.get("/farmers", authMiddleware,getAllFarmers);
router.get("/products", authMiddleware,getAllProducts);
router.get("/customers", authMiddleware,getAllCustomer);

module.exports = router;
