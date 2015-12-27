var express = require('express');
var path = require('path');
var app = express();
var rand = require('random-word');
var hbs = require('express-handlebars');
var db = require('./config/database');
var videos = require('./app/models/videos').videos;
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine('html', hbs({
    extname: '.html',
    defaultLayout: 'main'
}));
app.set('view engine', 'html');

app.get('/', function (req, res) {
    res.status(200).render('index', { word: rand() });
});

app.post('/db', function(req, res){

    console.log(req.body.data);

    // req.body.data.forEach(function(item){
    //     console.log(item);
    // });

    req.body.data.forEach(function(item, index){
        videos.create({
            videoTitle: item.snippet.title,
            videoId: item.id.videoId,
            youtubeObj: item
        });
    });

    res.sendStatus(200);

});

app.get('/db', function(req, res){
    videos.find(function(err, videos){
        if (err) {
            res.statusCode = 500;
            res.json(err);
        } else {
            res.statusCode = 200;
            res.json(videos);
        }
    });
});

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Surf app listening at http://%s:%s', host, port);
});