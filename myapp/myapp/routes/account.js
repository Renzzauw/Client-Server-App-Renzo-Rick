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
 
router.get('/', function(req, res, next) {  
    if (!req.session) {
        // visitor has not been logged in, redirect to login page
        res.redirect('/login');
    }
    else {
        console.log(req.session);
        // session detected, get user information and display on page
        db.get("SELECT * FROM Accounts WHERE userid="+req.session.userid, function(err, row) {
            res.render('account', { username: row.username, email: row.email, firstname: row.firstname, lastname: row.lastname, password: row.password}); 
        })   
    }      
});

/* POST users listing. */
router.post('/', function(req, res, next) {
    // get signup data from POST request
    console.log("> Handling changes");
    var found = false;
    var ui;
    db.get("SELECT * FROM Accounts WHERE userid="+req.body.userid, function(err, row) {
        found = true;
        ui = row.userid;
    })
    // username already exists
    if (found && req.body.username != ui) {
      res.render('signup', { error: "Username already exists."});
    }
    // user does not exist yet, proceed to creation of account
    else { 
      // generate userid, add to database create a session
      var stmt = db.prepare("UPDATE Accounts SET username=?, password=?, email=?, firstname=?, lastname=? WHERE userid=? ");
      stmt.run(id, req.body.username, req.body.password, req.body.email, req.body.firstname, req.body.lastname, req.session.userid);
      db.close();
      res.redirect('/account', { succes: "profile sucessfully updated!"});
    }
    db.close();
  });
  
  module.exports = router;