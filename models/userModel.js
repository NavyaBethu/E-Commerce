const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/database'); 

const User = db.define('user', { 
id: {type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
name: {type: DataTypes.STRING,allowNull: false},
email: {type:DataTypes.STRING,allowNull:false,unique:true},
password:{type:DataTypes.STRING,allowNull:false},
role: {type:DataTypes.ENUM('admin','customer'),defaultValue:'customer'},
isVerified: {type: DataTypes.BOOLEAN, defaultValue: false,},
verificationToken: {type: DataTypes.STRING,allowNull: true},
 }, 
{
  timestamps: true, 
});

User.beforeSave(async (user, options) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(10); 
    user.password = await bcrypt.hash(user.password, salt); 
  }
});

module.exports = User;
