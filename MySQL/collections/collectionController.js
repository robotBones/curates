var Collection = require('./collectionsModel.js');

module.exports = {
  collectionCreate: function(req, res) {
    var name = req.body.title;
    var description = req.body.description;
    // var url = req.body.url;

    new Collection({name: name}).fetch()
      .then(function(collection) {
        if (!collection) {
          var newCollection = new Collection({
            name: name,
            description: description,
            // url: url
          });
          newCollection.save()
            .then(function() {
              console.log('Collection saved');
            });
        } else {
          console.log('Collection already exists');
        }
      });
  },

  collectionGet: function(req, res) {
    var name = req.query.name;
    console.log(req.query)

    new Collection({name: 'jimmy'}).fetch()
      .then(function(collection) {
        if (!collection) {
          console.log('Collection does not exist');
        } else {
          res.json({name: 'jimmys shit', description: 'stuff', url: '/jimmys', links: [{url:'www.google.com'},{url:'www.amazon.com'},{url:'www.reddit.com'}]});
        }
      })
  },

  sendAll: function(req, res) {
    res.json({
      results: [
        {
          title: 'jimmys shit',
          description: 'stuff',
          url: 'jimmy',
          links: [
            {url:'www.google.com', name: 'Google', description: 'I am a description'},
            {url:'www.amazon.com', name: 'Amazon', description: 'I am a description'},
            {url:'www.reddit.com', name: 'Reddit', description: 'I am a description'}
          ]
        }
      ]
    });
  }

};