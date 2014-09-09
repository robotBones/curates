angular.module('curates.singleCollection', [])

.config(function($stateProvider) {
  $stateProvider
    .state('singleCollection', {
      url: '/:url',
      controller: 'singleCollectionController',
      templateUrl: 'modules/singleCollection/singleCollection.html',
      resolve: {
        collection: function(collectionFactory, $stateParams) {
          return collectionFactory.getCollection($stateParams.url)
            .then(function(collection) {
              return collection;
            });
        }
      }
    });
})

.controller('singleCollectionController', ['$scope', 'collectionFactory', 'collection', '$stateParams',
  function($scope, collectionFactory, collection, $stateParams) {
    $scope.collection = collection;

    // Allow the user to star their favorite collections and add to their favorite
    // collections list
    $scope.addFavorite = function(collection) {
      collectionFactory.addFavorite(collection);
    };

    // Allow the user to star their favorite collections and add to their favorite
    // collections list
    $scope.voteLink = function(collection, link, val) {
      var user = 'Me';
      collectionFactory.voteLink(collection, link, user, val);
    };
    
    $scope.addLink = function(collection, link) {
      collectionFactory.addLink(collection, link);
    };

  }]);
