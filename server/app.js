// *** main dependencies *** //
// var dotenv = require('dotenv');
// dotenv.load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// *** config file *** //
var config = require('../_config');

// *** routes *** //
var routes = require('./routes/api.js');
var authRoutes = require('./routes/auth');

// *** express instance *** //
var app = express();


// *** static directory *** //
//views server side //
// app.set('views', path.join(__dirname, 'views'));


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

// *** mongoose ** //
mongoose.connect(config.MONGOLAB_URI);

// *** main routes *** //
app.use('/api', routes);
app.use('/auth', authRoutes);
app.all('/*', function(req, res){
  res.sendFile(path.join(__dirname, '../client', 'layout.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
