var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* POST users listing. */
router.post('/', function(req, res, next) {
  // get login data from POST request
  var username = req.body.username;
  var password = req.body.password;
  console.log("Handling login");
  //res.render('login', { title: 'Login' });
  //res.send("ayy u logged in!");
  //res.end("Username: " + req.body.password);

  
});

module.exports = router;
