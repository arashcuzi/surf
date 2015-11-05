var express = require('express');
var path = require('path');
var app = express();
var rand = require('random-word');
var hbs = require('express-handlebars');

app.engine('html', hbs({
    extname: '.html',
    defaultLayout: 'main'
}));
app.set('view engine', 'html');

app.get('/', function (req, res) {
  res.status(200).render('index', { word: rand() });
});

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Surf app listening at http://%s:%s', host, port);
});