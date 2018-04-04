#!/usr/bin/env nodejs
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var $ = require("jquery");

// routes setup
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var signoutRouter = require('./routes/signout');
var accountRouter = require('./routes/account');
var historyRouter = require('./routes/history');

// express setup
var app = express();

// session setup
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);
app.use(session({
  store: new SQLiteStore,
  secret: 'thisisaveryverysneekysecret',
  resave: true,
  saveUninitialized: false,
}));

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
app.use('/signout', signoutRouter);
app.use('/account', accountRouter);
app.use('/history', historyRouter);

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
