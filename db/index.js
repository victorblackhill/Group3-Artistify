const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI)
  .then(x => console.log('Connected to Mongo'))
  .catch(err => console.error('Error to connect to Mongo'))