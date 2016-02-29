/**
 * Created by ying on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);
    function loginController($scope, $rootScope, $location, UserService) {
        $scope.login = login;

        function login() {
            UserService.findUserByCredentials($scope.loginUsername, $scope.loginPassword, function (user) {
                $rootScope.user = user;
                $location.url('/profile');
            });
            console.log($rootScope.user);
        }
    }
})();