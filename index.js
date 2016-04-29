var handler = require('./lib/handler');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.sendFile( __dirname + "/views/index.html" );
});

app.post('/activationlock', function (req, res) {
    var imeiList = req.body.toString().trim().split(',');
    handler.handle(imeiList, function (err) {
         if (err) {
            res.write('Oops! ' + err);
        }
        res.end();
    });
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
