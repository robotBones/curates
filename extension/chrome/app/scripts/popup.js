'use strict';

angular.module('curates', [
  'ui.router',
  'curates.services',
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
      url: '/users/login',
      params: {
        username: username,
        password: password
      }
    }).success(function(data) {
      // store the current user
      user.username = username;
      angular.copy([true], loggedIn);
      // create token
      $window.localStorage.setItem('curates-ext', data.token);
    }).error(function(data, statuscode) {
      // trigger some awesome event here
    });
  };

  var logout = function(username) {
    // remove token
    $window.localStorage.removeItem('curates-user');
    angular.copy([false], loggedIn);
    // trigger server to wipe token
    return $http({
      method: 'GET',
      url: '/users/signout',
      params: {
        username: username,
      }
    }).success(function(data) {
      // successful logout event
    }).error(function(data, statuscode) {
      // trigger some awesome event here
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
      url: '/api/users/' + user
    }).then(function(response) {
      return response.data;
    });
  };

  var addFavorite = function(user, collection) {
    return $http({
      method: 'POST',
      url: '/api/users/' + user,
      data: {collection: collection}
    })
    .success(function(data, code) {
      // do something awesome with the server response
    })
    .error(function(data, code) {
      // do something awesome with the server response
    });
  };

  var voteLink = function(collection, link, user, value) {
    // update the vote count for this link within the collection.
    return $http({
      method: 'POST',
      url: '/api/links/',
      data: {
        collection: collection,
        link: link,
        user: user,
        value: value,
      }
    })
    .success(function(data, code) {
      // do something cool with a successful post
    })
    .error(function(data, code) {
      // do something cool with a returned error
      console.log(data);
    });
  };

  return {
    login: login,
    logout: logout,
    addFavorite: addFavorite,
    getCollection: getCollection,
    getUserCollections: getUserCollections,
    voteLink: voteLink
  };

}]);