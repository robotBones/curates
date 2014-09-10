angular.module('curates.myCollections', [])

.config(function($stateProvider) {
  $stateProvider
  .state('user-collections', {
    url: '/collections/:user',
    controller: 'userCollectionsController',
    templateUrl: 'modules/myCollections/myCollections.html',
    resolve: {
      collections: function(collectionFactory, $stateParams) {
        return collectionFactory.getUserCollections($stateParams.user)
          .then(function(collections) {
            return collections;
          });
      }
    }
  });
})

.controller('userCollectionsController', function($scope, $stateParams, collections, userManagement) {
  $scope.user = userManagement.user;
  $scope.collections = collections;
});
