var userController = require('./usersController.js');

module.exports = function(app) {
  app.route('/signup')
    .post(userController.signupUser)

  app.route('/login')
    .get(userController.login)

  // app.route('/signout')
  //   .get(userController.signout)
};
