var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shoeSchema = Schema({
  shoeName : String,
  status:  String,
  price:String,
  location: String,
  img: String
});

var Shoe = mongoose.model('Shoe', shoeSchema);
module.exports = Shoe;
