var express = require('express');
var router = express.Router();
var url = require('url');

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

// Product class for generating html to showcase the product
class Product {
  constructor(productid, productName, releaseDate, publisher, genre, price, stock){
    this.productid = productid;
    this.productName = productName;
    this.releaseDate = releaseDate;
    this.publisher = publisher;
    this.genre = genre;
    this.price = price;
    this.stock = stock;
  }

  // Function that generates and returns fitting html if a product is in stock or not
  generateProductHtml() {
    var html = "";
    html = '<section class="product-field"><h5>Product ID: '+this.productid+'</h5><h3>'+this.productName+'</h3><h4>'+this.releaseDate+' '+this.publisher+' '+this.genre+'</h4><h5>Stock: '+this.stock+'</h5><img src="/images/products/'+this.productid+'.jpg" alt="game avatar">';
    
    // check if item is in stock
    if (this.stock <= 0) {
      html += '<form><button type="button" class="product-buttons" id="button-'+this.productid+'" disabled>Out of stock</button></form></section>';
    }
    // item is out of stock
    else {
      html += '<form><button type="button" onclick="toggleConfirmationScreen();" class="product-buttons" id="button-'+this.productid+'">Buy for €'+this.price+'</button></form></section>';
    }
    return html;
  }
}

/* GET home page. */
router.get('/', function(req, res, next) { 
  // render index page
  res.render('index');
});

router.get('/products', function(req, res, next){
  db.serialize(function() {
    var resdata = "";
    db.each("SELECT * FROM Products ORDER BY productname ASC", function(err, row) {
      pr = new Product(row.productid, row.productname, row.releasedate, row.publisher, row.genre, row.price, row.stock);         
      products.push(pr);
      resdata = pr.generateProductHtml();
      res.write(resdata);
    });
    res.send();
  });
  
/*
  // get query
  var parts = url.parse(req.url, true);
  var query = parts.query;
  var sortMode = query.sort;
  var searchTerm = query.search;
  
  var productshtml = "";
  console.log(sortMode);
  // get products from database based on sortmode
  if (sortMode === "alphabet"){
    console.log("rendering products: sorted alphabet");
    db.serialize(function() {
      productshtml = "";
      db.each("SELECT * FROM Products ORDER BY productname ASC", function(err, row) {
        pr = new Product(row.productid, row.productname, row.releasedate, row.publisher, row.genre, row.price, row.stock);         
        products.push(pr);
        productshtml += pr.generateProductHtml();
      });
    });
  }
  */
  //console.log("html: "+ productshtml);

  //res.send(productshtml);
});







/* GET products on home page. */
/*
router.get('/products', function(req, res, next){
  //var sortMode = req.query.sortby;

  var parts = url.parse(req.url, true);
  var query = parts.query;
  var sortMode = query.sort;
  var searchTerm = query.search;
  

  var productshtml = "";
  // get all products from the database and put them in an array
  db.serialize(function() {
    productshtml = "";
    db.each("SELECT * FROM Products", function(err, row) {
      pr = new Product(row.productid, row.productname, row.releasedate, row.publisher, row.genre, row.price, row.stock);         
      products.push(pr);
      productshtml += pr.generateProductHtml();
    });
  });


  alert(productshtml);
  res.send(productshtml);
});
*/
module.exports = router;