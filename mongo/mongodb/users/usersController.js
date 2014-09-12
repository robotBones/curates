var Users = require('../../mongo.js').user;

module.exports = {
  signupUser: function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    Users.findOne({username: username})
      .exec(function(err, found) {
        if (found) {
          res.status(500).send('User already exists');
        } else {
          var newUser = new Users({
            username: username,
            password: password
          });
          newUser.save();
          console.log('User saved');
          res.json({token: 'token'});
        }
      })
  },

  login: function(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    Users.findOne({username: username})
      .exec(function(err, found) {
        if (found) {
          if (found.password === password) {
            res.json({token: 'token'});
          } else {
            res.status(500).send('Bad password');
          }
        } else {
          res.status(500).send('User does not exist');
        }
      });
  }

};