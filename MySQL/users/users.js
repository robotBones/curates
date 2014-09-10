var db = require('./dbInit.js');

var User = db.Model.extend({
  tableName: 'users',

  hasTimestamps: true
});

module.exports = User;

