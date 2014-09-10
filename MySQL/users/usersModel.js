var db = require('../dbInit.js');

var User = db.Model.extend({
  tableName: 'users',

  // hasTimestamps: true

  comparePassword: function(attemptedPW) {
    if (attemptedPW === this.get('passwordHashed')) {
      return true;
    }
    return false;
  }
});

module.exports = User;

