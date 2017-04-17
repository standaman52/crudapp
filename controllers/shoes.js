var express = require('express');
var router = express.Router();
var Shoe = require('../models/shoes.js');
var bcrypt = require('bcrypt');

router.get('/new', function(req, res){
  res.render('shoes/create.ejs');
});




router.get('/show', function(req, res){
  res.render('shoes/show.ejs',{
      currentUser : req.session.currentUser

  });
});
router.post('/', function(req, res){
  Shoe.create(req.body, function(err, createdShoe){
    res.redirect('/shoes/show');
  });
});




module.exports = router;
