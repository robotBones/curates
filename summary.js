var getPage = require('summarizer').getPage;

module.exports = function(url) {

  return getPage(url)
    .then(function (data) {
      var result = {
        title: data.title,
        summary: data.summary.slice(0, 140)
      }

      //console.log('title: ' + result.title);
      //console.log('summary: ' + result.summary.slice(0, 140));

      return result;
    }, console.error);
};
