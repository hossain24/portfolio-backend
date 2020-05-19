const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require("passport");
require('dotenv/config');

const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

app.use(bodyParser.json());

// Cors and file upload module
app.use(cors({ credentials: true }));
app.use(fileUpload());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Database connection setup
const uri = process.env.DB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Router setup
const testRouter = require('./routes/hard-coded-route');
const usersRouter = require('./routes/users-route');
const uploadRouter = require('./routes/upload-image-route');
const videosRouter = require('./routes/youtube-api-route');
const memberRouter = require('./routes/members-route');

app.use('/hard-coded', testRouter);
app.use('/users-db', usersRouter);
app.use('/upload-image', uploadRouter);
app.use('/youtube-videos', videosRouter);
app.use('/members', memberRouter);

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + '/public'));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;