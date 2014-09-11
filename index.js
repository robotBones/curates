var app = require('./server/server.js');
var mysql = require('./MySQL/dbInit.js');
var schema = require('./MySQL/schema.js');

var port = 3000;
var url = 'localhost';

app.listen(port, url);

console.log("Listening on " + url + port);