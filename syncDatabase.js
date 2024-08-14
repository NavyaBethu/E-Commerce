const sequelize = require('./config/database');
const user = require('./models/userModel');
const product=require('./models/productModel');
const cart=require('./models/cartModel');
const order=require("./models/orderModel");
const profile=require('./models/profileModel');



async function syncDatabase() {
  try {
    await sequelize.sync({alter:true}); 
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

syncDatabase();
