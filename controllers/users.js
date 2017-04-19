var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var Shoe = require('../models/shoes.js');
var bcrypt = require('bcrypt');

router.get('/new', function(req, res){
  res.render('users/new.ejs');
});

router.get('/new/profile', function(req, res){
    console.log(req.session);
  res.render('users/myProfile.ejs',{
      currentUser : req.session.currentUser

  });
});

router.get('/:id', function(req, res){
  User.findById(req.params.id, function(err, foundUser){
    res.render('users/show.ejs', {
      user : foundUser
    });
  });
});

router.post('/', function(req, res){
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, function(err, createdUser){
    res.redirect('/');
  });
});


router.get('/:id/edit', function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		res.render('users/edit.ejs', {
			user: foundUser
		});
	});
});

router.put('/:id', function(req, res){
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	User.findByIdAndUpdate(req.params.id, req.body, function(){
		res.redirect('/users');
	});
});

module.exports = router;
