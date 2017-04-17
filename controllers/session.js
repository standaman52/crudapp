var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var bcrypt = require('bcrypt');


router.get('/new', function(req, res){

  res.render('sessions/new.ejs',{
      currentUser : req.session.currentUser

  });
});


router.post('/', function(req, res){
  User.findOne({username: req.body.username}, function(err, foundUser){
    if(bcrypt.compareSync(req.body.password, foundUser.password)){
      //session object is created
      //curentUser property is created right there
      req.session.currentUser = foundUser;
      res.redirect('users/show');

    }else {
              // res.redirect('sessions/new');
              res.render('sessions/errorpage.ejs');

    }

  });

});

module.exports = router;
