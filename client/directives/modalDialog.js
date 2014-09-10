angular.module('curates')

.directive('modalDialog', ['$sce', function($sce) {
  return {
    restrict: 'E',
    scope: {
      show: '=',
      url: '=',
      action: '&',
    },
    replace: true,
    // Replace with the template below
    link: function(scope) {
      scope.userInfo = {};
      scope.hideModal = function() {
        scope.show = false;
      };
      scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      };
    },
    templateUrl: function(tElement, tAttrs) {
      return tAttrs.templateUrl;
    }
  };
}]);