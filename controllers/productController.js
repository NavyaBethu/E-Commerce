const Product = require('../models/productModel');
const { Op } = require('sequelize');
const createproduct = async (req, res) => {
    try {
        const { name, description, price} = req.body;
        const imageUrl = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : null;
        const newproduct = await Product.create({ name, description, price, imageUrl });
        res.status(201).json({ message: 'Product created successfully', product:newproduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateproduct= async(req,res)=>{
    try{
        const {id}=req.params;
        const {name, description, price}=req.body;
        const imageUrl=req.file ? `http://localhost:3000/uploads/${req.file.filename}` : null;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.imageUrl = imageUrl || product.imageUrl;
        await product.save();
        res.status(200).json({ message: 'Product updated successfully', product });
    }
    catch{
        res.status(500).json({ message: error.message });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getProducts = async (req, res) => {
    try {
      const { name, minPrice, maxPrice } = req.query;
      const query = {};
      if (name) {
        query.name = {
          [Op.like]: `%${name}%` 
        };
      }
      if (minPrice !== undefined && maxPrice !== undefined) {
        query.price = {
          [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)] 
        };
      } else if (minPrice !== undefined) {
        query.price = {
          [Op.gte]: parseFloat(minPrice) 
        };
      } else if (maxPrice !== undefined) {
        query.price = {
          [Op.lte]: parseFloat(maxPrice) 
        };
      }
      console.log(query)
      const products = await Product.findAll({
        where: query
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
module.exports={
    createproduct,
    updateproduct,
    deleteProduct,getProducts
}