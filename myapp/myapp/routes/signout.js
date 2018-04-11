var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) { 
    res.clearCookie('connect.sid');
    /*
    req.session.destroy(function(err) {
        res.redirect('/');
    });
    //res.redirect('/');
    */
   res.redirect('/');
});

module.exports = router;