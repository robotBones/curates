angular.module('curates.services', [])
.factory('userManagement', ['$http', '$window' , function($http, $window) {

  var user = {};
  var loggedIn = [$window.localStorage.getItem('curates-user')];

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
      user.username = 'Bob';
      // user.username = data.username;
      angular.copy([true], loggedIn);
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
      user.username = username;
      // create token in local storage
      $window.localStorage.setItem('curates-user', data.token);
      // set logged in status
      angular.copy([true], loggedIn);
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
  $scope.loginShown = false;
  $scope.signupShown = false;

  $scope.login = function(data) {
    userManagement.login(data.username, data.password);
  };

  $scope.logout = function() {
    userManagement.logout();
  };

  $scope.signup = function(data) {
    userManagement.signup(data.username, data.password, data.email);
  };
});
