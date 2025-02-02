const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const productSchema = new mongoose.Schema({
    productId: { type: Number, unique: true },
    name: { type: String, require: true },
    category: { type: String, require: true },
    marketRate: { type: Number, require: true },
    price: { type: Number, require: true },
    quantity: { type: Number, require: true },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true },
    status: { type: String, default: "Pending" },
}, { timestamps: true });

productSchema.plugin(AutoIncrement, {
    inc_field: "productId",
    start_seq: 100000
});
module.exports = mongoose.model("Product", productSchema);