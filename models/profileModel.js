const { DataTypes } = require('sequelize');
const db=require("../config/database");
const User=require('./userModel')
const profile = db.define('profile', {
    userId: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'users',key: 'id'}},
    firstname: {type: DataTypes.STRING, allowNull: false},
      lastname: {type: DataTypes.STRING,allowNull: false},
      email: {type: DataTypes.STRING,  allowNull: false, unique: true},
      profilepicture: {type: DataTypes.STRING,allowNull:true}, 
      address: {type: DataTypes.STRING,allowNull: true},
      phonenumber: {type: DataTypes.STRING, allowNull: true,},

    }, 
    {
      timestamps: true, 
    });
profile.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(profile, { foreignKey: 'userId' });
module.exports=profile;