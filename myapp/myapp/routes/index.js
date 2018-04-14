var express = require('express');
var router = express.Router();
var url = require('url');
var dateTime = require('node-datetime');

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
    html = '<section class="product-field"><h5>Product ID: '+this.productid+'</h5><h3>'+this.productName+'</h3><h4>Release date: '+this.releaseDate+'</h4><h4>Developer: '+this.publisher+'</h4><h4>'+this.genre+'</h4><h5>Stock: '+this.stock+'</h5><img src="/images/products/'+this.productid+'.jpg" alt="game avatar"></img>';
    
    // item is out of stock, disable buy button
    if (this.stock <= 0) {
      html += '<form><button type="button" class="product-buttons" id="button-'+this.productid+'" disabled>Out of stock</button></form></section>';
    }
    // item is in stock
    else {
      html += '<form><button type="button" onclick="buyProduct('+ this.productid +',&quot;'+ this.productName +'&quot;,&quot;'+ this.price +'&quot;);" class="product-buttons" id="button-'+this.productid+'">Buy for €'+this.price+'</button></form></section>';
    }
    return html;
  }
}

/* GET home page. */
router.get('/', function(req, res, next) { 
  // render index page
  res.render('index');
});

/* POST home page. */
router.post('/', function(req, res, next) {
  db.serialize(function() {
    var stmt = db.prepare('UPDATE Products SET stock = stock - 1 WHERE productid=?');
    stmt.run(req.body.productid);
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    var stmt2 = db.prepare('INSERT INTO Orders VALUES (?,?,?,?)');
    stmt2.run(formatted, req.body.productid, parseFloat((req.body.productprice).replace(',', '.')), req.session.userid);
  });
});

/* GET all product genres */
router.get('/genres', function(req, res, next){ 
  db.serialize(function() {
    db.each('SELECT DISTINCT genre FROM Products', function(err, row) {
      res.write('<input type="checkbox" class="genrecheckboxes" id="'+ row.genre +'" name="'+ row.genre +'" checked><label for="'+ row.genre +'">'+ row.genre +'</label>');
    }, function(err, numberOfRetreivedRows){ res.end(); });
  });
});

/* GET all product publishers */
router.get('/publishers', function(req, res, next){ 
  db.serialize(function() {
    db.each('SELECT DISTINCT publisher FROM Products', function(err, row) {
      res.write('<input type="checkbox" class="publisher-checkboxes" id="'+ row.publisher +'" name="'+ row.publisher +'" checked><label for="'+ row.publisher +'">'+ row.publisher +'</label>');
    }, function(err, numberOfRetreivedRows){ res.end(); });
  });
});

/* GET minimum and maximum price of all products */
router.get('/prices', function(req, res, next){ 
  db.serialize(function() {
    db.get('SELECT MIN(price) FROM Products', function(err, row) {
      res.write(row.price);
    });
  });
  db.serialize(function() {
    db.get('SELECT MAX(price) FROM Products', function(err, row) {
      res.write(row.price);
    }, function(err, numberOfRetreivedRows){ res.end(); });
  });
});

/* GET products on home page. */
router.get('/products', function(req, res, next){
  // get search query
  var parts = url.parse(req.url, true);
  var query = parts.query;
  var sortMode = query.sort;
  var searchTerm = query.search;
  var amountLimit = query.amount;
  
  // no search term is present
  if (!searchTerm){
    // sort by name
    if (sortMode === "alphabet"){
      db.serialize(function() {
        var resdata = "";
        var counter = 0;
        db.each("SELECT * FROM Products ORDER BY productname ASC", function(err, row) {
          if(counter < amountLimit){
            pr = new Product(row.productid, row.productname, 
            row.releasedate, row.publisher, row.genre, 
            row.price, row.stock);         
            products.push(pr);
            resdata = pr.generateProductHtml();
            res.write(resdata);
          }
          counter++;
        }, 
        function(err, numberOfRetreivedRows){ res.end(); });
      });
    }

    // sort by price: increasing
    else if (sortMode === "price-increasing"){
      db.serialize(function() {
        var resdata = "";
        var counter = 0;
        db.each("SELECT * FROM Products ORDER BY price ASC", function(err, row) {
          if(counter < amountLimit){
            pr = new Product(row.productid, row.productname, 
            row.releasedate, row.publisher, row.genre, 
            row.price, row.stock);         
            products.push(pr);
            resdata = pr.generateProductHtml();
            res.write(resdata);
          }
          counter++;
        }, 
        function(err, numberOfRetreivedRows){ res.end(); });
      });
    }

    // sort by price: increasing
    else if (sortMode === "price-decreasing"){
      db.serialize(function() {
        var resdata = "";
        var counter = 0;
        db.each("SELECT * FROM Products ORDER BY price DESC", function(err, row) {
          if(counter < amountLimit){
            pr = new Product(row.productid, row.productname, 
            row.releasedate, row.publisher, row.genre, 
            row.price, row.stock);         
            products.push(pr);
            resdata = pr.generateProductHtml();
            res.write(resdata);
          }
          counter++;
        }, 
        function(err, numberOfRetreivedRows){ res.end(); });
      });
    }
  }

  // search term is present
  else {
    // sort by name
    if (sortMode === "alphabet"){
      db.serialize(function() {
        var resdata = "";
        var counter = 0;
        db.each('SELECT * FROM Products WHERE productname LIKE "%'+searchTerm+'%" ORDER BY productname ASC', function(err, row) {
          if(counter < amountLimit){
            pr = new Product(row.productid, row.productname, 
            row.releasedate, row.publisher, row.genre, 
            row.price, row.stock);         
            products.push(pr);
            resdata = pr.generateProductHtml();
            res.write(resdata);
          }
          counter++;
        }, 
        function(err, numberOfRetreivedRows){ res.end(); });
      });
    }

    // sort by price: increasing
    else if (sortMode === "price-increasing"){
      db.serialize(function() {
        var resdata = "";
        var counter = 0;
        db.each('SELECT * FROM Products WHERE productname LIKE "%'+searchTerm+'%" ORDER BY  price ASC', function(err, row) {
          if(counter < amountLimit){
            pr = new Product(row.productid, row.productname, 
            row.releasedate, row.publisher, row.genre, 
            row.price, row.stock);         
            products.push(pr);
            resdata = pr.generateProductHtml();
            res.write(resdata);
          }
          counter++;
        }, 
        function(err, numberOfRetreivedRows){ res.end(); });
      });
    }

    // sort by price: increasing
    else if (sortMode === "price-decreasing"){
      db.serialize(function() {
        var resdata = "";
        var counter = 0;
        db.each('SELECT * FROM Products WHERE productname LIKE "%'+searchTerm+'%" ORDER BY  price DESC', function(err, row) {
          if(counter < amountLimit){
          pr = new Product(row.productid, row.productname, 
          row.releasedate, row.publisher, row.genre, 
          row.price, row.stock);         
          products.push(pr);
          resdata = pr.generateProductHtml();
          res.write(resdata);
          }
          counter++;
        }, 
        function(err, numberOfRetreivedRows){ res.end(); });
      });
    }
  }
});

module.exports = router;