var Collection = require('./linksModel.js');

module.exports = {
  addLink: function(req, res) {
    var url = req.body.url;
    var link = req.body.name;

    new Link({url: url}).fetch()
      then(function(url) {
        if (!url) {
          var newLink = new Link({
            name: name;
          });
          newLink.save()
            .then(function() {
              console.log('Link saved');
            });
        } else {
          console.log('Link already exists');
        }
      })
  }
};