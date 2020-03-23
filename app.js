const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');

const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

app.use(bodyParser.json());

// cors and file upload module
app.use(cors({ credentials: true }));
app.use(fileUpload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// database connection setup
const db = mongoose.connect(process.env.DB_URI,
  { useNewUrlParser: true }, () => {
    console.log('Database is connected');
  });

// router setup
const testRouter = require('./routes/hard-coded-route');
const usersRouter = require('./routes/users-route');
const uploadRouter = require('./routes/upload-image-route');

app.use('/hard-coded', testRouter);
app.use('/users-db', usersRouter);
app.use('/upload-image', uploadRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + '/public'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;