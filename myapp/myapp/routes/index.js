var express = require('express');
var router = express.Router();


var fs = require("fs");
var file = "databases/database.db";
var exists = fs.existsSync(file);
if(!exists) {
  fs.openSync(file, "w");
}
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
  db.each("SELECT productname,productid FROM Products", function(err,row){
    document.write(productname);
  })
});
db.close();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
