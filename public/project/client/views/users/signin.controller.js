/**
 * Created by ying on 4/20/16.
 */
(function() {
    angular
        .module("ReviewApp")
        .controller("SigninController", SigninController);

    function SigninController($rootScope, $location, UserService) {
        var model = this;
        model.signin = signin;

        function signin(user) {
            if (user) {
                UserService
                    .signin(user)
                    .then(
                        function (response) {
                            $rootScope.user = response.data;
                            $location.url('/profile');
                        },
                        function (err) {
                            model.error = "Username or password not found!";
                        }
                    )
            }
        }
    }
})();