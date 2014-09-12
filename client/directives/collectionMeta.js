angular.module('curates')

.directive('collectionMeta', ['collectionFactory', 'userManagement', function(collectionFactory, userManagement) {
  return {
    restrict: 'E',
    scopes: {
      collection: '=',
    },
    templateUrl: 'directives/collectionMeta.html',
    link: function(scope) {

      scope.addFav = function (collection) {
        collectionFactory.addFavorite(userManagement.user.username, collection);
      };
      
      scope.setCollection = function(collection) {
        angular.copy(collection, collectionFactory.collection);
      };
    }
  }
}]);