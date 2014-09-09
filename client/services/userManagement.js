angular.module('curates.services', [])
.factory('userManagement', ['$http', '$window' , function($http, $window) {

  var user = {};
  var loggedIn = false;

  var login = function(username, password) {
    return $http({
      method: 'GET',
      url: '/users',
      params: {
        username: username,
        password: password
      }
    }).success(function(res) {
      user.user = res.user;
      // create token
      $window.localStorage.setItem('curates-user', res.token);
    })
  };
  var logout = function() {
    initUser();
  };

  return {
    user: user,
    loggedIn: loggedIn,
    login: login,
    logout: logout,
    validateUser: validateUser
  };
}])

.controller('userManagementController', function($scope, userManagement) {
  $scope.user = userManagement.user;
  $scope.loggedIn = userManagement.loggedIn;

  $scope.login = function(username, password) {
    userManagement.login()
  };
  $scope.logout = function() {
    userManagement.loggedIn = false;
    $scope.loggedIn = false;
    userManagement.logout();
  }
});
