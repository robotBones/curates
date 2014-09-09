angular.module('curates.services', [])
.factory('userManagement', ['$http', '$window' , function($http, $window) {

  var user = {};
  var loggedIn = $window.localStorage.getItem('curates-user');

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
      user.user = data.user;
      // create token
      $window.localStorage.setItem('curates-user', data.token);
    }).error(function(data, statuscode) {
      // trigger some awesome event here
    });
  };

  var signup = function(username, password, email) {
    return $http({
      method: 'POST',
      url: '/users/signup',
      data: {
        username: username,
        // email: email, // integrate me
        password: password,
      }
    }).success(function(data) {
      // store the current user
      user.user = data.user;
      // create token
      $window.localStorage.setItem('curates-user', data.token);
    }).error(function(data, statuscode) {
      // trigger some awesome event here
    });
  };

  var logout = function(username) {
    // remove token
    $window.localStorage.removeItem('curates-user');
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

  return {
    user: user,
    loggedIn: loggedIn,
    login: login,
    logout: logout,
  };
}])

.controller('userManagementController', function($scope, userManagement) {
  $scope.user = userManagement.user;
  $scope.loggedIn = userManagement.loggedIn;

  $scope.login = function(username, password) {
    userManagement.login(username, password);
  };

  $scope.logout = function() {
    userManagement.logout();
  };

  $scope.signup = function(username, password, email) {
    userManagement.signup(username, password, email);
  }
});
