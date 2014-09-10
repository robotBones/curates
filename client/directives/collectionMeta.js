angular.module('curates')

.directive('collectionMeta', ['collectionFactory', function(collectionFactory) {
  return {
    restrict: 'E',
    scopes: {
      collection: '='
    },
    templateUrl: 'directives/collectionMeta.html'
  }
}]);