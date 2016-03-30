/**
 * Created by ying on 2/20/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);
    function profileController($rootScope, $location, UserService) {
        var model = this;
        model.username = $rootScope.user.username;
        model.password = $rootScope.user.password;
        model.email = $rootScope.user.email;
        model.firstname = $rootScope.user.firstName;
        model.lastname = $rootScope.user.lastName;

        model.update = update;

        function update() {
            var userId = $rootScope.user.id;
            var userObj = {
                id: $rootScope.user.id,
                username: model.username,
                password: model.password,
                firstName: model.firstname,
                lastName: model.lastname,
                email: model.email
            };

            UserService.updateUser(userId, userObj)
                .then(function (user) {
                    $rootScope.user = user;
                })

        }
    }
})();