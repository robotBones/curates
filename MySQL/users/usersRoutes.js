var userController = require('./usersController.js');

module.exports = function(app) {
  app.route('/')
    .post(userController.signupUser);
}