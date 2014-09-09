angular.module('curates.myCollections', [])

.config(function($stateProvider) {
  $stateProvider
  .state('myCollections', {
    url: '/collections/:user',
    controller: 'myCollectionsController',
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

.controller('myCollectionsController', function($scope, $stateParams, collections, userManagement) {
  $scope.user = userManagement.user;
  $scope.collections = collections;
});
