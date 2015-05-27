/**
 * Created by nagsu03 on 5/27/2015.
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express('app');
var port = process.env.PORT || 8580;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var morgan = require('morgan');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));

app.set('view engine', 'ejs');

app.use(session({secret: 'betterJob@1234'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/routes.js')(app, passport);

app.listen(port);

console.log("Server is up on port: " + port);