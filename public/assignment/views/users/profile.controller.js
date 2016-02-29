/**
 * Created by ying on 2/20/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);
    function profileController($scope, $rootScope, $location, UserService) {
        $scope.update = update;
        $scope.user = $rootScope.user;

        $scope.profileUsername = $rootScope.user.username;
        $scope.profilePassword = $rootScope.user.password;
        $scope.profileFirstname = $rootScope.user.firstName;
        $scope.profileLastname = $rootScope.user.lastName;
        $scope.profileEmail = $rootScope.user.email;

        function update() {
            var user = {
                username: $scope.profileUsername,
                password: $scope.profilePassword,
                firstName: $scope.profileFirstname,
                lastName: $scope.profileLastname,
                email: $scope.profileEmail
            }
            UserService.updateUser($rootScope.user._id, user, function (user) {
                $rootScope.user = user;
            })
            //console.log($rootScope.user)
        }
    }
})();