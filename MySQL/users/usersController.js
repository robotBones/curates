var User = require('./usersModel.js');

module.exports = {
  signupUser: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    new User({username: username}).fetch()
      .then(function(user) {
        if (!user) {
          var newUser = new User({
            username: username,
            passwordHashed: password
          });
          newUser.save()
            .then(function() {
              console.log('User saved');
            });
        }
      });
  }
};