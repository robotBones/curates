angular.module('curates.createCollection', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('create', {
      url: '/create',
      templateUrl: 'modules/createCollection/createCollection.html',
      controller: 'createCollectionController'
    });
})

.controller('createCollectionController', function($scope, $state, userManagement, collectionFactory) {
  // Only loggedIn users can create collections
  $scope.collection;
  $scope.loggedIn = userManagement.loggedIn;

  $scope.submitCreate = function(collection) {
    collectionFactory.createCollection(collection);
  };
});
