'use strict';

angular.module('curates', [
  'ui.router',
])

.config(['$stateProvider' , function($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'templates/main.tpl.html'
    })
    .state('collection', {
      url: '/collection',
      templateUrl: 'templates/collection.tpl.html',
      resolve: {
        collection: function(Services) {
          return Services.getCollection(url)
            .then(function(collection) {
              return collection;
            });
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.tpl.html'
    });

}])

.controller('MainController', ['collection', 'collections', function(collection, collections) {
  $scope.current = collection;
  $scope.collections = collections || [];
}])

.factory('Services', ['$http', function($http){

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
  };

  var addLink = function(url, link) {
    return $http({
      method: 'POST',
      url: 'api/collection/' + url,
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
      url: '/api/users/' + user
    }).then(function(response) {
      return response.data;
    });
  };
};

  return {
    addLink: addLink,
    getCollection: getCollection,
    getUserCollections: getUserCollections,
    login: login,
    logout: logout,
  };

}]);