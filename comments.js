// Create web server
// Run: node comments.js
// Access: http://localhost:3000/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost/comments');

// Create schema
var commentSchema = new mongoose.Schema({
  name: String,
  comment: String
});

// Create model
var Comment = mongoose.model('Comment', commentSchema);

// Create static file server
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// Set template engine
app.set('view engine', 'ejs');

// Listen to port 3000
app.listen(3000, function() {
  console.log('Server is running on port 3000');
});

// Handle GET request
app.get('/', function(req, res) {
  // Get all comments from database
  Comment.find({}, function(err, comments) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {comments: comments});
    }
  });
});

// Handle POST request
app.post('/', function(req, res) {
  // Create new comment
  Comment.create(req.body, function(err, comment) {
    if (err) {
      console.log(err);
    } else {
      console.log(comment);
      // Redirect to home page
      res.redirect('/');
    }
  });
});