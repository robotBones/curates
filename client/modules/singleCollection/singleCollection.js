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

    $scope.addLink = function(link) {
      collectionFactory.addLink($scope.collection, link);
    };

  }]);
