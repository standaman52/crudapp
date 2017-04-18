var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Shoe = require('../models/shoes.js');


var userSchema = Schema({
  username : {type:String, required: true, unique: true},
  password: {type: String, required: true},
  picture: {type: String},
  shoes : [Shoe.schema]
});

var User = mongoose.model('User', userSchema);
module.exports = User;
