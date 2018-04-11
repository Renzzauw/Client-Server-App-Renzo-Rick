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
        var results = "";
        // get all history that is linked to the user from the database
        db.serialize(function(){
            db.each('SELECT * FROM Orders WHERE userid=' + req.session.userid + 'ORDER BY date DESC', function(err, row){
                var line = row.date + " " + row.productid + " " + row.price + "\n";
                results += line;
            });
        });
        // no results found
        if (results === ""){
            res.render('history', { history: "No purchase history available" });
        }
        // results have been found, return them
        else {
            res.render('history', { history: results });
        }      
    }       
});

module.exports = router;