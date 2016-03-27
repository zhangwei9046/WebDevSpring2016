/**
 * Created by ying on 2/20/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($scope, $rootScope, $location, UserService) {
        $scope.register = register;

        function register() {
            if ($scope.registerUsername != undefined && $scope.registerPassword != undefined &&
                $scope.registerVerifyPassword != undefined && $scope.registerPassword == $scope.registerVerifyPassword &&
                $scope.registerEmail != undefined) {
                var user = {
                    username: $scope.registerUsername,
                    password: $scope.registerPassword,
                    email: $scope.registerEmail
                };
                UserService.createUser(user)
                    .then(function (newUser) {
                    $rootScope.user = newUser;
                    $location.url('/profile');
                });
            }
        }
    }
})();