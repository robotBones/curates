angular.module('curates')

.factory(['randomFactory', function($http, $q){

  return $http({
    method: 'GET',
    url: '/api/all',
  })
}]);