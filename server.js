//allows us to use node expression
var express = require('express');
var app = express();


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

// Initialize appication with route / (that means root of the application)
app.get('/chat', function(req, res){
  var express = require('express');
  app.use(express.static(path.join(__dirname)));
  res.render("new.ejs");
});


//http://javabeginnerstutorial.com/javascript-2/create-simple-chat-application-using-node-js-express-js-socket-io/\
//THIS IS NOT MY A CODE
// Register events on socket connection
io.on('connection', function(socket){
  socket.on('chatMessage', function(from, msg){
    io.emit('chatMessage', from, msg);
  });
  socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });
});




var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shoeapp';


//allows the use of mongodb
var mongoose = require('mongoose');
var db = mongoose.connection;

//allows transfer of data from webforms
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

//allows to delete/edit
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

//connects to the database
mongoose.connect(mongoDBURI);
db.once('open', function() {
  console.log('connected to mongo');
});

//this creates a session
var session = require('express-session');
app.use(session({
  secret: "thedestroyer",
  resave: false,
  saveUninitialized: false
}));
//Helps with css
app.use(express.static('public'));
//checks to see if the server is running

//controller models
var usersController = require('./controllers/users.js');
app.use('/users', usersController);


var usersSessions = require('./controllers/session.js');
app.use('/sessions', usersSessions);


var usersShoes = require('./controllers/shoes.js');
app.use('/shoes', usersShoes);



app.get('/', function(req, res){
    console.log(req.session);
  res.render('index.ejs', {
        currentUser : req.session.currentUser
  });

});

app.listen(port, function(){
  console.log('listening');
});

// Listen application request on port 3000
// http.listen(3000, function(){
//   console.log('listening on :3000');
// });
