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

        function login() {
            var username = model.username;
            var password = model.password;
            console.log(username);
            UserService
                .findUserByCredentials(username, password)
                .then(function (user) {
                    if (user != null) {
                        $rootScope.user = user;
                        $location.url('/profile');
                    }
                });

        }
    }
})();