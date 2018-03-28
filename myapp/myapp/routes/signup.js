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

db.serialize(function() {
    /*
    if(!exists) {
      db.run("CREATE TABLE Accounts (username TEXT, password TEXT)");
    }
    var stmt = db.prepare("INSERT INTO Accounts VALUES (?,?,?)");
    stmt.run("test","w8woord");
    stmt.finalize();
    */
    db.get("SELECT username FROM Accounts", function(err, row) {
      foundMatch = {
                     username: row.username
                   }
    });
});
db.close();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('signup');
});

/* POST users listing. */
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
    // generate userid, add to database
    res.render('index');
  }
});

module.exports = router;
