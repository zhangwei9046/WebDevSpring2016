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
            if (!model.username || !model.password || !model.verifypassword || !model.email) {
                alert("Please fill the fields");
            } else if (model.password != model.verifypassword) {
                alert("Password not match");
            } else {
                var user = {
                    username: model.username,
                    password: model.password,
                    email: model.email
                };
                UserService.createUser(user)
                    .then(function (user) {
                        console.log(user);
                        $rootScope.user = user;
                        $location.url('/profile');
                    });
            }
        }
    }
})();