angular.module('curates.collectionsList', [])

.config(['$stateProvider',function($stateProvider) {
  $stateProvider
    .state('collections', {
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

.controller('collectionsListController', ['$scope', 'collections', 'userManagement',
  function($scope, collections, userManagement) {
    // Initialize search filter string used in ng-repeat orderBy filter   
    $scope.predicate = '-stars';
    $scope.user = userManagement.user.username;
    // Get data from factory and populate listData with list of collections
    $scope.listData = collections;
  }
]);
