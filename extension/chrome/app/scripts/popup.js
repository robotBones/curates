'use strict';

angular.module('curates', [
  'ui.router',
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('collection', {
      url: '/collection',
      templateUrl: 'templates/collection.tpl.html',
      controller: 'NavigateController',
    })
    .state('collections', {
      url: '/collections',
      templateUrl: 'templates/collections.tpl.html',
      controller: 'CollectionController'
    })
    .state('login', {
      url: '/',
      templateUrl: 'templates/login.tpl.html',
      controller: 'LoginController'
    });

}])

.controller('LoginController', ['$scope', '$state', 'Services',
  function($scope, $state, Services) {
    $scope.login = function(data) {
      var username = data.username;
      var password = data.password;
      Services.login('bob', 123);
      $state.go('collections');
    };
    
    Services.getUserCollections()
      .then(function(collections) {
        angular.copy(collections, $scope.collections);
      });
  }
])

.factory('Services', ['$window', '$http', function($window, $http){

  var user = {};
  var current = {};

  var login = function(username, password) {
    return $http({
      method: 'GET',
      url: 'http://127.0.0.1:3000/users/login',
      params: {
        username: username,
        password: password
      }
    }).success(function(data) {
      // store the current user
      user.username = username;
      // create token
      $window.localStorage.setItem('curates-ext', data.token);
    }).error(function(data, statuscode) {
      // trigger some awesome event here
    });
  };

  var logout = function() {
    // remove token
    $window.localStorage.removeItem('curates-ext');
    delete user.username;
  };

  var addLink = function(url, link) {
    return $http({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/collection/' + url,
      data: {
        link: link
      }
    })
    .success(function(data, code) {
      // do something cool with a successful post
    })
    .error(function(data, code) {
      // do something cool with an error
    });
  };

  var getCollection = function(url) {
    return $http({
      method: 'GET',
      url: '/api/collection/' + url
    }).then(function(response) {
      return response.data;
    });
  };

  var getUserCollections = function(user) {
    return $http({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/users/' + user
    }).then(function(response) {
      return response.data;
    });
  };

  return {
    addLink: addLink,
    current: current,
    getCollection: getCollection,
    getUserCollections: getUserCollections,
    login: login,
    logout: logout,
    user: user,
  };

}]);