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
  if(!exists) {
    db.run("CREATE TABLE Accounts (username TEXT, password TEXT)");
  }
  //var stmt = db.prepare("INSERT INTO Accounts VALUES (?,?,?)");
  //stmt.run("test","w8woord");
  //stmt.finalize();
  db.get("SELECT userid, username, password FROM Accounts", function(err, row) {
    foundMatch = {
                   userid: row.userid,
                   username: row.username,
                   password: row.password 
                 }
  });
});
db.close();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* POST users listing. */
router.post('/', function(req, res, next) {
  // get login data from POST request
  console.log("> Handling a login");
  // match found
  if (req.body.username === foundMatch.username && req.body.password === foundMatch.password) {
    console.log("  - account found.");
    res.render('index');
  }
  // incorrect login data
  else {
    console.log("  - account not found.");  
    res.render('login', { title: 'Login', error: 'Username or password is wrong, try again.' });
  }
});

module.exports = router;
