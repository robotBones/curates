angular.module('curates')

.directive('collectionMeta', ['collectionFactory', function(collectionFactory) {
  return {
    restrict: 'E',
    scopes: {
      collection: '=',
      user: '='
    },
    templateUrl: 'directives/collectionMeta.html',
    link: function(scope) {
      scope.addFav = function () {
        collectionFactory.addFavorite(scope.user, scope.collection);
      };
    }
  }
}]);