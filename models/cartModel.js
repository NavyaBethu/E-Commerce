const { DataTypes } = require('sequelize');
const db = require('../config/database');
const User = require('./userModel');
const Product = require('./productModel');

const CartItem = db.define('CartItem', {
  id: {type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
  userId: {type:DataTypes.INTEGER,allowNull:false,references:{model:User,key:'id'}},
  productId: {type: DataTypes.INTEGER,allowNull: false,references: { model: Product,key: 'id'}},
  quantity: {type: DataTypes.INTEGER,allowNull: false},}, 
  {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'productId'], 
    },
  ],
});

CartItem.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(CartItem, { foreignKey: 'userId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(CartItem, { foreignKey: 'productId' });



module.exports = CartItem;
