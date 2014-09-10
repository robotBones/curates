angular.module('curates', [
  'ui.router',
  'curates.collectionsList',
  'curates.myCollections',
  'curates.createCollection',
  'curates.singleCollection',
  'curates.collectionFactory',
  'curates.services',
  'curates.random'
])

.config(['$urlRouterProvider', function($urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
}]);
