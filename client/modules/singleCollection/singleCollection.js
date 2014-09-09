angular.module('curates.singleCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('singleCollection', {
      url: '/:url',
      templateUrl: 'modules/singleCollection/singleCollection.html'
    })
})

.controller('singleCollectionController', function($scope, $state, $stateParams, collectionFactory, userManagement) {
  var url = $stateParams.url;
  $scope.notYetUpvoted = true;
  $scope.collection = {};
  $scope.isUser = false;

  collectionFactory.getCollection(url).then(function(collection) {
    if (collection != null) {
      $scope.isUser =
        (userManagement.user.id === collection.user.id &&
         userManagement.user.provider === collection.user.provider);
      $scope.collection = collection;
    }
  });

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
