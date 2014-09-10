angular.module('curates.random', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('random', {
    url: '/1/r',
    templateUrl: 'modules/random/experimental.html',
    controller: 'randomController'
  });


})

.controller('randomController', function(){

});