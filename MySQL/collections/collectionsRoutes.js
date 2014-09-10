var collectionController = require('./collectionController.js');

module.exports = function(app) {
  app.route('/:url')
    .post(collectionController.createCollection);

  app.route('/:url')
    .get(collectionController.login);
  
  app.route('/all')
    .get(collectionController.login);

};