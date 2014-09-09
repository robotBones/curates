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

.controller('singleCollectionController', ['$scope', 'collectionFactory', 'collection', function($scope, collectionFactory, collection) {
  $scope.collection = collection;

  $scope.addFavorite = function(collection) {
    collectionFactory.addStar(collection);
  };

  $scope.upVoteCollection = function(collection) {

  };

  $scope.upVoteLink = function(collection, link) {
    collectionFactory.upVoteLink(collection, link);
  };
  
  $scope.addLink = function(collection, link) {
    collectionFactory.addLink(collection, link);
  };
}]);
