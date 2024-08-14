const cart=require("../models/cartModel")
const product=require("../models/productModel")
const getCartItems = async (req, res) => {
    const userId = req.userId; 
  
    try {
      const cartItems = await cart.findAll({
        where: { userId }
         });
      return res.status(200).json({ data: cartItems });
    } catch (error) {
      console.error('Error retrieving cart items:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

const addProductToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId; 
    const productexist=await product.findByPk(productId);
    if(!productexist){
        return res.status(400).json({message:"product not found"})
    }
      const existingItem = await cart.findOne({
        where: { userId, productId },
      });
        if (existingItem) {
        existingItem.quantity = quantity;
        await existingItem.save();
        return res.status(200).json({ message: 'Cart item updated', data: existingItem });
      }
      const newCartItem = await cart.create({ userId, productId, quantity });
      return res.status(201).json({ message: 'Product added to cart', data: newCartItem });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

const updateitem= async (req,res)=>{
    try{
        const {id}= req.params;
        const userId=req.userId;
        const {quantity}= req.body;
        const cartitem= await cart.findOne({where:{id,userId}})
        if(!cartitem){
            return res.status(404).json({message:"cart item not found"})
        }
        cartitem.quantity=quantity;
        cartitem.save()
        return res.status(200).json({ message: 'Cart item updated', data: cartitem });
    }
    catch(err){
        console.error("error updating cart:",err)
        return res.status(500).json({message:'Internal server error'})
    }
};
const deleteCartItem = async (req, res) => {
    try {
      const { id } = req.params; 
      const userId = req.userId
      const cartItem = await cart.findOne({
        where: { id, userId },
      });
  
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
      await cartItem.destroy();
  
      return res.status(200).json({ message: 'Cart item deleted' });
    } catch (error) {
      console.error('Error deleting cart item:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
module.exports={getCartItems,addProductToCart,updateitem,deleteCartItem}  