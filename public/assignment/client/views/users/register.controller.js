/* Created by ying on 2/20/16. ...*/
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($rootScope, $location, UserService) {
        var model = this;
        model.register = register;

        function register() {
            if (model.password != model.verifypassword || !model.password || !model.verifypassword) {
                model.error = "Your passwords don't match";
            } else {
                var user = {
                    username: model.username,
                    password: model.password,
                    email: model.email
                };
                UserService.register(user)
                    .then(function (response) {
                            if (response.data) {
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