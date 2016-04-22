/**
 * Created by ying on 4/19/16.
 */
(function() {
    angular
        .module("ReviewApp")
        .controller("SignupController", SignupController);

    function SignupController($rootScope, $location, UserService) {
        var model = this;
        model.signup = signup;

        function signup(user) {
            if (user.password != model.verifypassword || !user.password || !model.verifypassword) {
                model.error = "Your passwords don't match";
            } else {
                UserService.signup(user)
                    .then(function (response) {
                            if (response.data) {
                                //console.log(response.data);
                                $rootScope.user = response.data;
                                $location.url("/profile");
                            } else {
                                model.error = "User Existed";
                            }
                        },
                        function (err) {
                            model.error = err;
                        });
            }
        }
    }
})();