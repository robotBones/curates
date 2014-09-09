angular.module('curates')

.directive('collectionMeta', ['collectionFactory', function(collectionFactory) {
  return {
    restrict: 'E',
    scopes: {
      collection: '='
    },
    templateUrl: 'directives/collectionMeta.html',
    link: function(scope) {
      scope.castVote = function(collection, link, val) {
        var user = 'Me';
        collectionFactory.voteLink(collection, link, user, val);
      };
    }
  }
}]);