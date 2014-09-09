angular.module('curates.singleCollection', [])

.config(function($stateProvider) {
  $stateProvider
    .state('singleCollection', {
      url: '/:url',
      controller: 'singleCollectionController',
      templateUrl: 'modules/singleCollection/singleCollection.html',
      resolve: {
        collection: function(collectionFactory, $stateParams) {
          console.log($stateParams.url);
          return collectionFactory.getCollection($stateParams.url)
            .then(function(collection) {
              return collection;
            })
        }
      }
    });
})

.controller('singleCollectionController', function($scope, collectionFactory, collection) {
  $scope.collection = collection;

  $scope.upVoteCollection = function(collection) {
    collectionFactory.addStar(collection);
  };

  $scope.upVoteLink = function(collection, link) {
    collectionFactory.upVoteLink(collection, link);
  };
  
  $scope.newLink = function(collection, link) {
    collectionFactory.addLink(collection, link);
  };
});
