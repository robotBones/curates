angular.module('curates.random', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('random', {
    url: '/r',
    templateUrl: 'random/experimental.html',
    controller: 'randomController'
  });


})

.controller(['randomController', function(){

}]);