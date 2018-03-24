var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// routes setup
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// express setup
var app = express();

// fileserver and databases setup
var fs = require("fs");
var accountsfile = "databases/accounts.db";
var accountsexists = fs.existsSync(accountsfile);
var sqlite3 = require("sqlite3").verbose();
var accountsdb = new sqlite3.Database(accountsfile);

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
