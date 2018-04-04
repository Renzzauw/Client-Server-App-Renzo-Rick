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
  }
  generateProductHtml() {
    //var field = document.getElementById("product-list");
    var html = "";
    html = '<section class="product-field"><h3>Product ID: '+this.productid+'</h3><h3>'+this.productName+'</h3><h4>'+this.releaseDate+' - '+this.publisher+' - '+this.genre+'</h4><form><button type="submit">Buy</button></form></section>';
    //<h3>€'+this.price+'</h3><img src="'+this.productImageLocation+'" alt="game avatar">
    console.log(html);
    return html;
  }
}

/*
//function getProductsFromDB(){
  db.serialize(function() {
    db.each("SELECT * FROM Products", function(err, row) {
      pr = new Product(row.productid, row.productname, row.releasedate, row.publisher, row.genre);         
      products.push(pr);
      console.log(pr);
    });
/*
    // order by price
    db.all("SELECT * FROM Products ORDER BY price ASC", function(err, row) {
      pr = new Product(row.productid, row.productname, row.releasedate, row.publisher, row.genre);
      products.push(pr);  
    });
  });
//}
*/

//db.close();
var productshtml = "";
/* GET home page. */
router.get('/', function(req, res, next) {
  
  
  db.serialize(function() {
    db.each("SELECT * FROM Products", function(err, row) {
      pr = new Product(row.productid, row.productname, row.releasedate, row.publisher, row.genre);         
      products.push(pr);
      //console.log(pr);
      //productshtml.concat(pr.generateProductHtml());
      productshtml += pr.generateProductHtml();
    });
    //console.log("HTML: "+productshtml);
  });
  


  res.render('index');
  
});

router.get('/getdata', function(req, res, next) {
  getProductsFromDB();
  res.render('index');
  console.log(products);
});

module.exports = router;