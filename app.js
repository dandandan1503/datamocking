if(!Array.prototype.randomValue) {
  Array.prototype.randomValue = function(offset) {
    offset = offset || 0;
    return this[Math.floor(Math.random() * this.length) + offset];
  };
}
if (!String.prototype.pad) {
  String.prototype.pad = function (length, ch) {
    var str = this;
    ch = ch || ' ';
    while (str.length < length) {
      str = ch + str;
    }
    return str;
  }
}

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('express-cors');

var dataMockingApi = require('./routes/datamockingapi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  allowedOrigins: [
      'localhost:*',
      'hs1engweb02.sbcsystems.local:*'
  ]
}));
app.set('json spaces', 4);

app.use('/datamocking', dataMockingApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
