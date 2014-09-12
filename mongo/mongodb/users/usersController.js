var Users = require('../../mongo.js').user;
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');

var comparePassword = function(attempted, password) {
  bcrypt.compare(attemptedPassword, password, function(err, isMatch) {
    return isMatch;
  });
};

var hashPassword = function(password) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        return hash;
      });
  });
};


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
            password: hashPassword(password);
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