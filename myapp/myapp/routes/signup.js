// * router for signup page * //

var express = require('express');
var router = express.Router();

// fileserver and databases setup
var fs = require("fs");
var file = "databases/database.db";
var exists = fs.existsSync(file);
if(!exists) {
  fs.openSync(file, "w");
}
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
var foundMatch = {};

// get potential duplicate username entries in database
db.serialize(function() {
    db.each("SELECT username FROM Accounts", function(err, row) {
      foundMatch = {
                     username: row.username
                   }
    });
});

/* GET signup */
router.get('/', function(req, res, next) {
  if(req.session.userid) {
    res.redirect('/'); 
  }  
  else {
    res.render('signup');
  }
  
});

/* POST signup */
router.post('/', function(req, res, next) {
  // get signup data from POST request
  console.log("> Handling a signup");
  // username already exists
  if (req.body.username === foundMatch.username) {
    res.render('signup', { error: "Username already exists."});
  }
  // passwords do not match up
  else if (req.body.password !== req.body.confirmpassword) {
    res.render('signup', { error: "Password fields do not match up."});
  }
  // user does not exist yet, proceed to creation of account
  else { 
    db.serialize(function() {
      var id = Math.floor(Math.random() * 10000000);
      var stmt = db.prepare("INSERT INTO Accounts VALUES (?,?,?,?,?,?)");
      stmt.run(id, req.body.username, req.body.password, req.body.email, req.body.firstname, req.body.lastname);
    });
    res.redirect('/login');
  }
});

module.exports = router;
