var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
//var session = require('express-session');
var cookieParser  = require('cookie-parser');

app.use(bodyParser.json({limit: '50mb'}));// for parsing application/json
app.use(bodyParser.urlencoded({limit: '50mb', extended: false})); // for parsing application/x-www-form-urlencoded
app.use(multer());//for parsing multipart/form-data
//app.use(session({
//    secret: 'this is the secret' }));
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var connectionString = 'mongodb://127.0.0.1:27017/cs5610';
//Why is this set this way?
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

require("./public/assignment/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress);