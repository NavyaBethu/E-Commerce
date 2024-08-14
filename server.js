const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const productRoutes=require('./routes/productRoutes');
const cartRouter=require("./routes/cartRoutes");
const profileRouter=require('./routes/profileRoutes');
const orderRouter=require("./routes/orderRoutes");
const bodyParser = require('body-parser');


const app=express()
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api',productRoutes);

app.use("/api",cartRouter);
app.use("/api",profileRouter);
app.use("/api",orderRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
