const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI
console.log(process.env)
mongoose.connect('mongodb://localhost/artistify')
  .then(x => console.log('Connected to Mongo'))
  .catch(err =>console.error('Error to connect to Mongo'))