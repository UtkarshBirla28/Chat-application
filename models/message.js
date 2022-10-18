const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
  name:String,
  message:String
})

const Msg= mongoose.model('msg',msgSchema);

module.exports = Msg;
