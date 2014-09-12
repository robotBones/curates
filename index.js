var userController = require('./mongo/mongodb/users/usersController.js');
var collectionController = require('./mongo/mongodb/collections/collectionController.js');
var express = require('express');
var url = require('url');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client'));


app.post('/users/signup', userController.signupUser);

app.get('/users/login', userController.login);

app.post('/api/collection/create', collectionController.collectionCreate);

app.post('/api/collection/addlink', collectionController.addLink);

app.get('/api/collection', collectionController.collectionGet);

app.get('/api/collection/all', collectionController.fetchAll);

app.get('/api/collection/users', collectionController.getUserCollections);

app.post('/api/collection/addfav', collectionController.addFavorite);

app.put('/api/links', collectionController.voteLink);


app.listen(port, function() {
  console.log('listening on: ', port);
});