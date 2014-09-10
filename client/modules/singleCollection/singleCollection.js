angular.module('curates.singleCollection', [])

.config(function($stateProvider) {
  $stateProvider
    .state('collection', {
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

.controller('singleCollectionController', ['$scope', 'collectionFactory', 'collection', '$stateParams', 'userManagement',
  function($scope, collectionFactory, collection, $stateParams, userManagement) {
    $scope.collection = collection;

    // Allow the user to star their favorite collections and add to their favorite
    // collections list
    $scope.addFavorite = function(collection) {
      collectionFactory.addFavorite(userManagement.user.username, collection);
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
