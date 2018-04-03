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
        // session detected, get user information and display on page
        db.get("SELECT * FROM Accounts WHERE userid="+req.session.userid, function(err, row) {
            res.render('account', { username: row.username, email: row.email, firstname: row.firstname, lastname: row.lastname, password: row.password}); 
        })   
    }      
});

router.post('/', function(req, res, next){
    // aanpassingen doorgeven aan DB
});

module.exports = router;