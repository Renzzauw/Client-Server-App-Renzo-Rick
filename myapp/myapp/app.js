var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// routes setup
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');

// express setup
var app = express();

// fileserver and databases setup
var fs = require("fs");
var dbfile = "databases/database.db";
var dbexists = fs.existsSync(dbfile);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(dbfile);

// creates database tables if the file does not exist
/*
db.serialize(function() {
  if(!dbexists) {
    db.run("CREATE TABLE Accounts (AccountID int, FirstName varchar(255), LastName varchar(255), Username varchar(255), Password varchar(255)); CREATE TABLE Products (ProductID int, ProductName varchar(255), ProductPrice float(255,2), ProductCountInStock int");
  }
});
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// redirection to routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);

// *** error handling *** 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
