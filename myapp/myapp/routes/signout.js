// * router for logout page * //

var express = require('express');
var router = express.Router();

/* GET signout page */
router.get('/', function(req, res, next) { 
    res.clearCookie('connect.sid');
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;