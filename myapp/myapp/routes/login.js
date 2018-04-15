// * router for login page * //

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
 
/* GET users listing. */
router.get('/', function(req, res, next) {
  // check if a user is already logged in, if so redirect to homepage
  if(req.session.userid) {
     res.redirect('/'); 
  }
  // no logged in user, proceed to login page
  else {
    res.render('login');
  }
  
});

/* POST users listing. */
router.post('/', function(req, res, next) {
  db.serialize(function() {
    db.each("SELECT * FROM Accounts WHERE username='"+ req.body.username + "'", function(err, row) {
      //console.log("e");
      if(row){
        foundMatch = {
          userid: row.userid,
          username: row.username,
          password: row.password 
        }
      }
      console.log("gevonden: "+foundMatch);
    }, function(){
        // get login data from POST request
        console.log("> Handling a login");
        // match found
        if (req.body.password === foundMatch.password) {
          console.log("  - account found.");
          // add userid to session and redirect to index page
          req.session.userid = foundMatch.userid;
          res.redirect('/');
        }
        // incorrect login data, display error message
        else {
          console.log("  - account not found.");  
          //req.session.userid = id;
          res.render('login', { error: 'Username or password is wrong, try again.' });
        }
    });
  });  
});

module.exports = router;
