var getPage = require('summarizer').getPage;

module.exports = function(url) {
  return getPage(url)
    .then(function (data) {
      return data;
    }, console.error);
};
