const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const farmerRoutes = require("./routes/farmerRoutes");
const customerRoutes = require("./routes/customerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const mapApiRoutes = require("./routes/map_routes");
connectDB();

app.use(cors({
    origin: "http://localhost:3001",  // Allow requests from frontend
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

 
app.use(express.json());
app.use("/api/farmer", farmerRoutes);
app.use("/api/customer",customerRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/location",mapApiRoutes);

app.listen(5000, () => {
    console.log("Server is running");
})