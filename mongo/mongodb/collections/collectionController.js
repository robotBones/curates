var Collections = require('../../mongo.js').collection;
var Users = require('../../mongo.js').user;

module.exports = {
  collectionCreate: function(req, res) {
    var title = req.body.title;
    var description = req.body.description;
    var url = req.body.url;

    Collections.findOne({title: title})
      .success(function(found) {
        if (found) {
          res.json(found);
        } else {
          var newCollection = new Collection({
            title: title,
            description: description,
            url: url
          });
          newCollection.save()
            .then(function(collection) {
              var id = collection._id;
              res.json(newCollection);
            });
        }
      })
  },

  collectionGet: function(req, res) {
    var title = req.query.title;

    Collections.findOne({title: title})
      .success(function(found) {
        if (found) {
          res.json(found);
        } else {
          res.json({});
        }
      });
  },

  fetchAll: function(req, res) {
    Collections.find()
      .success(function(collections) {
        res.send(collections);
      });
  },

  addLink: function(req, res) {
    var url = req.body.url;
    var title = req.body.title;
    var link = req.body.link;

    Collections.findOne({title: title})
      .success(function(collection) {
        if (!collection) {
          res.send('Collection does not exist');
        } else {
          collection.links.push(link);
          collection.save();
          res.send('Link added');
        }
      });
  },

  addFavorite: function(req, res) {
    var username = req.body.username;
    var collection = req.body.collection;

    Users.findOne({username: username})
      .success(function(user) {
        if (!user) {
          res.send('User not found');
        } else {
          user.favorites.push(collection._id);
          user.save();
          res.send('Favorite added');
        }
      })
  },

  getUserCollections: function(req, res) {
    var username = req.body.username;

    Users.findOne({username: username})
      .then(function(data) {
        var favorites = data.user.favorites;
        return favorites;
      })
      .then(function(favs) {
        Collections.find({_id: {$in: favs}})
          .success(function(collections) {
            res.json(collections);
          });
      });
  },

  voteLink: function(req, res) {
    var value = req.body.value;
    var title = req.body.title;
    var link = req.body.linkTitle;

    Collections.find({title: title})
      .success(function(collection) {
        if (collection) {
          collection.links.forEach(function(item) {
            if (item.title === link) {
              if (value > 0) {
                item.upVote++;
              } else {
                item.downVote++;
              }
            }
          });
          collection.save();
          res.send('Links voted');
        } else {
          res.send('Collection does not exist');
        }

      }); 
  };

};