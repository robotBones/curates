angular.module('curates.collectionsList', [])

.config(['$stateProvider',function($stateProvider) {
  $stateProvider
    .state('collectionsList', {
      url: '/',
      templateUrl: 'modules/collectionsList/collectionsList.html',
      controller: 'collectionsListController',
      resolve: {
        collections: function(collectionFactory) {
          return collectionFactory.fetchCollections()
            .then(function(list) {
              return list;
            });
        }
      }
    });
}])

.controller('collectionsListController', ['$scope', 'collections', function($scope, collections) {
  // Initialize search filter string used in ng-repeat orderBy filter   
  $scope.predicate = '-stars';
  
  // Get data from factory and populate listData with list of collections
  $scope.listData = collections;
}]);
