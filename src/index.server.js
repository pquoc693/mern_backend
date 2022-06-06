const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config();


//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

mongoose.connect(process.env.MONGOOSE, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log('Connect database')
})

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

app.listen(process.env.PORT, () => {
  console.log('server is running ' + process.env.PORT);
})