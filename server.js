var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/index.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/webapps.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/webapps.html'));
});

app.get('/iOSapps.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/iOSapps.html'));
});

app.get('/contact.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/contact.html'));
});

app.listen(8080);