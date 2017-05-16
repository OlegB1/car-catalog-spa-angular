var express = require('express');

var app = express();

var fs = require('fs');

var cars  = fs.readFileSync('server/cars.json','utf8');

app.use(express.static(__dirname + '/../client/build'));

app.get('/api/cars',function (req,res) {
    res.header('Content-Type', 'application/json');
    res.send(cars);
});

app.listen(8080);
console.log('server started..');