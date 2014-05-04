var gzippo = require('gzippo');
var express = require('express');
var app = express();

app.use(express.logger('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

app.get('/', function(request, response) {
    response.sendfile(__dirname + '/dist/index.html');
}).configure(function() {
    app.use('/', express.static(__dirname + '/dist/'));
});

app.listen(process.env.PORT || 5000);


