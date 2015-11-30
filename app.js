var express = require('express');
var path = require('path');
var app = express();

app.get('/', function (req, res) {
  res.status(200).send('Hello Surf!');
});

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Surf app listening at http://%s:%s', host, port);
});