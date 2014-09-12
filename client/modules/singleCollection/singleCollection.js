angular.module('curates.singleCollection', [])

.config(function($stateProvider) {
  $stateProvider
    .state('collection', {
      url: '/:url',
      controller: 'singleCollectionController',
      templateUrl: 'modules/singleCollection/singleCollection.html'
    });
})

.controller('singleCollectionController', ['$scope', 'collectionFactory', 'userManagement',
  function($scope, collectionFactory, userManagement) {
    $scope.addShown = false;
    $scope.collection = collectionFactory.collection;

    // Allow the user to upvote and downvote collections
    $scope.voteLink = function(collection, link, val) {
      collectionFactory.voteLink(collection, link, val);
    };

    $scope.addLink = function(link) {
      collectionFactory.addLink($scope.collection.title, link);
      if (!collectionFactory.collection.links) {
        collectionFactory.collection.links = [];
      }
      collectionFactory.collection.links.push(link);
    };

  }]);
