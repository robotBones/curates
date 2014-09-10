var db = require('../dbInit.js');

var Collection = db.Model.extend({
  tableName: 'collections',

  hasTimestamps: true
});

module.exports = Collection;