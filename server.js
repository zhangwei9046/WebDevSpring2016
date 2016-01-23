var express = require('express');
var app = express();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/hello', function(req, res){
    res.send('Hello world!');
});

app.listen(port, ipaddress);