var Collection = require('./collectionsModel.js');

module.exports = {
  collectionCreate: function(req, res) {
    var name = req.body.name;
    var description = req.body.description;
    var url = req.body.url;

    new Collection({name: name}).fetch()
      .then(function(collection) {
        if (!collection) {
          var newCollection = new Collection({
            name: name,
            description: description,
            url: url
          });
          newCollection.save()
            .then(function() {
              console.log('Collection saved');
            });
        } else {
          res.send('collection already exists');
        }
      })
  },



};