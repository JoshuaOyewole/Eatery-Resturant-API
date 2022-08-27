const Order = require("../models/Order.js") ;
const createError = require("../util/error");

//QUERY ORDER
const getOrder = async (req,res,next)=>{
    try{
      const order = await Order.findById(req.params.id);
      res.status(200).json(order);
    }
     catch(err){ 
        next(err);
    }
  }
//QUERY ALL ORDERS
  const getOrders = async (req,res,next)=>{
    try{
      const orders = await Order.find({});
      res.status(200).json(orders);
    }
     catch(err){ 
        next(err);
    }
  }

  //MAKE AN ORDER
  const addOrder =  async (req,res,next)=>{
    
    try{
      if(!req.body.name && !req.body.totalPrice) {
        return next(createError(401, "Please Kindly fill the required Data!"));
      } 

      const order = await Order.create(req.body);
      res.status(200).json(order);
    }
     catch(err){ 
        next(err);
    }
  }

  //UPDATE AN ORDER
  const updateOrder =  async (req,res,next)=>{
    try{
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {$set:req.body},
        {new:true}
      );
      if(!updatedOrder){
          res.status(400).json(`Order ID not found!`)
      }
      res.status(201).json('Order Information successfully Updated');
    }
     catch(err){
        next(err);
    }
  }

  //DELETE AN ORDER
  const deleteOrder =  async (req,res,next)=>{
    try{
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);
     
      //CHECK IF THE ID IS VALID
      if(!deletedOrder){
       res.status(400).json(`Order ID does not Exist, Kindly try again!`);
      }
      else{
       res.status(201).json(`${deletedOrder.name}  deleted successfully`);
      }
    }
     catch(err){
        next(err);
    }
   }

   module.exports = { getOrder, getOrders, addOrder, updateOrder, deleteOrder};