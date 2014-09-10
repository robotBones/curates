angular.module('curates.collectionFactory', [])

// This factory houses all the appropriate HTTP methods for handling requests
// that center around collections.  POST requests are handled using success and
// error functionality.  GET requests are handled using then in order to allow
// controllers to resolve them and bind data before rendering.
.factory('collectionFactory', ['$http', function($http){

  var addLink = function(url, link) {
    return $http({
      method: 'POST',
      url: 'api/collection/' + url,
      data: {
        link: link
      }
    })
    .success(function(data, code) {
      // do something cool with a successful post
    })
    .error(function(data, code) {
      // do something cool with an error
    });
  } 
  var getCollection = function(url) {
    return $http({
      method: 'GET',
      url: '/api/collection/' + url
    }).then(function(response) {
      return response.data;
    });
  };

  var fetchCollections = function() {
    return $http({
      method: 'GET',
      url: '/api/all'
    })
    .then(function(response) {
      return response.data;
    });
  };

  var getUserCollections = function(user) {
    return $http({
      method: 'GET',
      url: '/api/users/' + user
    }).then(function(response) {
      return response.data;
    });
  };

  var createCollection = function(collection) {
    return $http({
      method: 'POST',
      url: '/api/collection/create',
      data: collection
    })
    .success(function(data, code) {
      // do something awesome with the server response
    })
    .error(function(data, code) {
      // do something awesome with the server response
    });
  };

  var addFavorite = function(user, collection) {
    return $http({
      method: 'POST',
      url: '/api/users/' + user,
      data: {collection: collection}
    })
    .success(function(data, code) {
      // do something awesome with the server response
    })
    .error(function(data, code) {
      // do something awesome with the server response
    });
  };

  var voteLink = function(collection, link, user, value) {
    // update the vote count for this link within the collection.
    return $http({
      method: 'POST',
      url: '/api/links/',
      data: {
        collection: collection,
        link: link,
        user: user,
        value: value,
      }
    })
    .success(function(data, code) {
      // do something cool with a successful post
    })
    .error(function(data, code) {
      // do something cool with a returned error
      console.log(data);
    });
  };

  return {
    addFavorite: addFavorite,
    addLink: addLink,
    createCollection: createCollection,
    getCollection: getCollection,
    fetchCollections: fetchCollections,
    getUserCollections: getUserCollections,
    voteLink: voteLink,
  };

}]);
