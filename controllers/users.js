var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var Shoe = require('../models/shoes.js');
var bcrypt = require('bcrypt');

router.get('/new', function(req, res){
  res.render('users/new.ejs');
});


router.get('/new/profile', function(req, res){
  res.render('users/index.ejs',{
      currentUser : req.session.currentUser

  });
});

router.post('/', function(req, res){
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, function(err, createdUser){
    res.redirect('/');
  });
});



module.exports = router;