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
      user.user = data.user;
      // create token
      $window.localStorage.setItem('curates-user', data.token);
    }).error(function(data, statuscode) {
      // trigger some awesome event here
    });
  };
  var logout = function() {
    // remove token
    $window.localStorage.removeItem('curates-user', data.token);

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
