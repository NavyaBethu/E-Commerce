const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {type: DataTypes.INTEGER,autoIncrement: true,  primaryKey: true, allowNull: false},
  name: {type:DataTypes.STRING, allowNull:false,},
  description: {type: DataTypes.TEXT,allowNull: true,},
  price: {type: DataTypes.FLOAT,allowNull: false,},
  imageUrl: {type:DataTypes.STRING,allowNull:true},  
}, 
{
 
  timestamps: true, 
});
Product.sync();

module.exports = Product;
