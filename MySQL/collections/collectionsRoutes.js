var collectionController = require('./collectionController.js');

module.exports = function(app) {
  app.route('/create')
    .post(collectionController.collectionCreate);

  app.route('/:url')
    .get(collectionController.collectionGet);
  
  // app.route('/all')
  //   .get(collectionController.login);

};