const { DataTypes, Model, ENUM } = require('sequelize');
const db = require('../config/database');
const User = require('./userModel');
const Product = require('./productModel');
const Order=db.define('Order',{
userId:{type:DataTypes.INTEGER,allowNull:false,references:{model:User,key:'id'}},
productId:{type:DataTypes.INTEGER,allowNull:false,references:{model:Product,key:"id"}},
status:{type:DataTypes.ENUM("processing", "shipped","delivered"),
     defaultValue: 'processing'},
},
{
 timestamps:true,
});
Order.belongsTo(User, { foreignKey: 'userId'  });
Order.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Order;