var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = Schema({
  username : {type:String, required: true, unique: true},
  password: {type: String, required: true},
  picture: {type: String},
});

var User = mongoose.model('User', userSchema);
module.exports = User;
