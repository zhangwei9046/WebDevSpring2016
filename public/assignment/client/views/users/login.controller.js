/**
 * Created by ying on 2/20/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);
    function loginController($rootScope, $location, UserService) {
        var model = this;
        model.login = login;

        function login(user) {
            if (user) {
                UserService
                    .login(user)
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
            //UserService
            //    .findUserByCredentials(username, password)
            //    .then(function (user) {
            //        if (user != null) {
            //            $rootScope.user = user;
            //            $location.url('/profile');
            //        }
            //    });

        }
    }
})();