var express = require('express');
var router = express.Router();
var Shoe = require('../models/shoes.js');
var bcrypt = require('bcrypt');
var User = require('../models/users.js');

router.get('/new', function(req, res){
  res.render('shoes/create.ejs',{
    currentUser : req.session.currentUser
  });
});

router.get('/:id/edit', function(req, res){
	Shoe.findById(req.params.id, function(err, foundShoe){
		res.render('shoes/edit.ejs', {
			shoe: foundShoe
		});
	});
});




router.get('/:id', function(req, res){
  Shoe.findById(req.params.id, function(err, foundShoes){
    User.findOne({'shoes._id': req.params.id}, function(err, foundUsers){
      res.render('shoes/show.ejs',{
        shoe: foundShoes,
        user : foundUsers
      });
    });
  });
});

//articles index route
router.get('/', function(req, res){
  Shoe.find({}, function(err, foundShoes){
    res.render('shoes/index.ejs', {
      shoe: foundShoes,

    });

  });
});






router.post('/', function(req, res){
  User.findById(req.body.userId, function(err, foundUsers){
    Shoe.create(req.body, function(err, createdShoe){
      foundUsers.shoes.push(createdShoe);
      foundUsers.save(function(err, data){
        res.redirect('/shoes');
      });
    });
  });
});

router.delete('/:id', function(req, res){
	Shoe.findByIdAndRemove(req.params.id, function(){
		User.findOne({'shoes._id': req.params.id}, function(err, foundUser){
			//this was edit to delete article from both when the delete is clicked
			foundUser.shoes.id(req.params.id).remove();
			foundUser.save(function(err, savedUser){
					res.redirect('/shoes');
			});
		});
	});
});

router.put('/:id', function(req, res){
	Shoe.findByIdAndUpdate(req.params.id, req.body,{new:true}, function(err, updatedShoe){
		User.findOne({'shoes._id': req.params.id}, function(err, foundUser){
			foundUser.shoes.id(req.params.id).remove();
			foundUser.shoes.push(updatedShoe);
			foundUser.save(function(err, data){
				res.redirect('/shoes');
			});
		});
	});
});


module.exports = router;
