var db = require('../dbInit.js');

var Link = db.Model.extend({
  tableName: 'links',

  hasTimestamps: true
});

module.exports = Link;