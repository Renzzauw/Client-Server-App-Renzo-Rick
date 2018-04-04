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

//var field = document.getElementById("product-list");
var products = [];
var orderMode = [];

class Product {
  constructor(productid, productName, releaseDate, publisher, genre){
    this.productid = productid;
    this.productName = productName;
    this.releaseDate = releaseDate;
    this.publisher = publisher;
    this.genre = genre;
    products.push(this);
  }

  

  generateProductHtml() {
    //var field = document.getElementById("product-list");
    var html = "";
    html = '<section class="product-field"><h3>Product ID: '+productid+'</h3><h3>'+productName+'</h3><h4>'+releaseDate+' - '+publisher+' - '+genre+'</h4><h3>€'+price+'</h3><img src="'+productImageLocation+'" alt="game avatar"><form><button type="submit">Buy</button></form></section>';
    return html;
  }
}


function getProductsFromDB(){
  db.serialize(function() {
    // order by productname
    db.each("SELECT * FROM Products ORDER BY productname ASC", function(err, row) {
           pr = new Product(row.productid, row.productname, row.releasedate, row.publisher, row.genre); 
    });

    // order by price
    db.each("SELECT * FROM Products ORDER BY price ASC", function(err, row) {
      pr = new Product(row.productid, row.productname, row.releasedate, row.publisher, row.genre);  
});
  });
}

db.serialize(function() {
  db.each("SELECT productname,productid FROM Products", function(err,row){
  })
});
db.close();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index',);
  
});

router.get('/getdata', function(req, res, next) {
  
  res.render('index', {data: products});
  
});

module.exports = router;