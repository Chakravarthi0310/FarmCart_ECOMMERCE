const Order = require("../models/Order");
const Customer = require("../models/Customer");
const Product=require("../models/Product");
const Farmer = require("../models/Farmer")

exports.placeOrder = async (req,res)=>{
    try{
        const {customerId, products}=req.body;
        let totalPrice=0;
        let orderItems=[];

        for(let item of products)
        {
            const product = await Product.findById(item._id);
            if(!product || product.status !== "Approved"){
                return res.status(400).json({message:`Product ${item._id} not awailable or not approved`});
            }
            if(item.quantity > product.quantity){
                return res.status(400).json({message:`Insufficinet stock fro product ${product.name}`});
            }
            totalPrice += product.price*item.quantity;
            orderItems.push({product:product._id, quantity:item.quantity});

            product.quantity-=item.quantity;
            await product.save();
        }
        const order = new Order({customer:customerId,products:orderItems,totalPrice});
        await order.save();
        await Customer.findByIdAndUpdate(customerId,{$push:{order:order._id}});
        res.status(201).json({message:"order placed successfully"});
        

    }catch(e)
    {
        res.status(500).json({message:"Error placing order", error:e.message});

    }
};

