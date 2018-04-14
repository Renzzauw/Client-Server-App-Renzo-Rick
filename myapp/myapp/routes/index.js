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

/* GET products on home page. */
router.get('/products', function(req, res, next){
  // get search query
  var parts = url.parse(req.url, true);
  var query = parts.query;
  var amountLimit = query.amount;

  // query variables
  var sortMode = query.sort;
  var searchTerm = query.search;

  // min and max prices
  var min = query.min;
  var max = query.max;

  // genres
  var action = query.action;
  var shooter = query.shooter;
  var racing = query.racing;
  var platformer = query.platformer;
  var sports = query.sports;
  var othersgenre = query.othergenre;

  // publishers
  var activision = query.activision;
  var ubisoft = query.ubisoft;
  var ea = query.ea;
  var nintendo = query.nintendo;
  var otherpublisher = query.otherpublisher;

  function generateSQL(){
    var sql = 'SELECT * FROM Products WHERE ';
    if (searchTerm){
      sql += 'productname LIKE "%'+searchTerm+'%" ';
    }

    if (action){ sql += 'genre="action" OR '; }
    if (shooter){ sql += 'genre="shooter" OR '; }
    if (racing){ sql += 'genre="racing" OR '; }
    if (platformer){ sql += 'genre="platformer" OR '; }
    if (sports){ sql += 'genre="sports" OR '; }
    sql += '"0=1"';
    sql += "ORDER BY ";
    if (sortMode === "alphabet"){
      sql += 'productname ASC';
    }
    else if (sortMode === "price-increasing"){
      sql += 'price ASC';
    }
    else {
      sql += 'price DESC';
    }
    console.log(sql);
    return sql;
  }

  db.serialize(function() {
    var resdata = "";
    var counter = 0;
    db.each(generateSQL(), function(err, row) {
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
});

module.exports = router;