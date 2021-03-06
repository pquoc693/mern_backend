const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config();
const path = require('path');


//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/admin/initialData');
const pageRoutes = require('./routes/admin/page');
const addressRoutes = require('./routes/address');
const orderRoutes = require("./routes/order");

mongoose.connect(process.env.MONGOOSE, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log('Connect database')
})

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, authorization, Keep-AIive,id');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('x-powered-by', 'Django');
  const allowedOrigins = [
    'http://localhost:4000',
    // 'https://localhost:4000',
    'http://localhost:3000',
    // 'https://localhost:3000/'
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  next();
})

app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes);
app.use('/api', pageRoutes);
app.use('/api', addressRoutes);
app.use("/api", orderRoutes);

app.listen(process.env.PORT, () => {
  console.log('server is running ' + process.env.PORT);
})