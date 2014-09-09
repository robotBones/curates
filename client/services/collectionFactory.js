angular.module('curates.collectionFactory', [])
.factory('collectionFactory', ['$http', function($http){

  var addLink = function(collection, url, link) {
    return $http({
      method: 'POST',
      url: 'api/collection/' + url,
      data: {
        collection: collection,
        link: link
      }
    })
    .success(function(data) {
      // do something cool with a successful post
    })
    .error(function(data) {
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
    }).then(function(response) {
      return response.data;
    });
  };

  var addFavorite = function(collection) {
    return $http({
      method: 'POST',
      url: '/api/collection/addStar',
      data: data
    }).then(function(response) {
      return response.data;
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
    .success(function(data) {
      // do something cool with a successful post
      console.log(data);
    })
    .error(function(data) {
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
