// dbConfig.js
const mongoose = require('mongoose');

// Ensure that process.env.MONGO_URI is set to your MongoDB URI
const mongo_url = process.env.mongo_url || 'mongodb+srv://Hem:Hem123@cluster0.f10ened.mongodb.net/hem-bloodbank?retryWrites=true&w=majority';

mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error('MongoDB Connection Error', err);
  });


  console.log('Mongourl:', mongo_url);
