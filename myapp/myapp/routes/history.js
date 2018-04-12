var express = require('express');
var router = express.Router();

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("databases/database.db");

router.get('/', function(req, res, next) {  
    // redirect user without session back to home page
    if(!req.session.userid) {
        res.redirect('/'); 
    }
    else {
        res.render('history');             
    }       
});

router.get('/his', function(req, res, next){
    var results = "";
    // get all history that is linked to the user from the database
    db.serialize(function(){
        db.each('SELECT * FROM Orders WHERE userid=' + req.session.userid + ' ORDER BY date DESC', function(err, row){
            var line = "<h4>Date: " + row.date + "\t | Product ID: " + row.productid + "\t | " + row.price.replace('.', ',') + "</h4>";                
            res.write(line);
            results += line;
        }, function() {
            // no results found
            if (results === ""){
                res.end('No order history found.');
            }
            // results have been found
            else {
                res.end();
            }  
        });
    });
});

module.exports = router;