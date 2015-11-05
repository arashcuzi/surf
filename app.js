let express = require('express');
let path = require('path');
let app = express();

app.get('/', function (req, res) {
  res.status(200).send('Hello Surf!');
});

app.use(express.static(path.join(__dirname, 'public')));

let server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Surf app listening at http://%s:%s', host, port);
});