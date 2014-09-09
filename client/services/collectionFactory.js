angular.module('curates.collectionFactory', [])
.factory('collectionFactory', function($http){

  var addLink = function(collection, link) {
    return $http({
      method: 'POST',
      url: 'api/collection/update',
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
      url: '/api/user/' + user.provider + '/' + user.id
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

  var upVoteLink = function(collection, link, user) {
    // update the vote count for this link within the collection.
    return $http({
      method: 'POST',
      url: 'api/collection/update',
      data: {
        collection: collection,
        link: link,
        user: user
      }
    })
    .success(function(data) {
      // do something cool with a successful post
    })
    .error(function(data) {
      // do something cool with an error
    });
  };

  var upVoteCollection = function(collection) {
    // update the collection vote count
  };

  return {
    addFavorite: addFavorite,
    addLink: addLink,
    createCollection: createCollection,
    getCollection: getCollection,
    fetchCollections: fetchCollections,
    getUserCollections: getUserCollections,
    updateCollection: updateCollection,
    upVoteLink: upVoteLink,
    upVoteCollection: upVoteCollection
  };

});
