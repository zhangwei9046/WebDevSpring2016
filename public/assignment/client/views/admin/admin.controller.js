/* Created by ying on 2/20/16.*/
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);
    function adminController($rootScope, UserService) {
        var model = this;

        model.addUser = addUser;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.editUser = editUser;

        loadAllUsers();

        function loadAllUsers() {
            UserService.findAllUsers()
                .then(function (response) {
                    model.users = response;
                });
        }

        function addUser() {
            var foundUsername = UserService.findUserByUsername(model.username).username;
            if (foundUsername == model.username) {
                alert("User existed");
                return;
            }
            if (model.username && model.password && model.rolesText) {
                var roles = model.rolesText.split(",");
                var newUser = {
                    username: model.username,
                    password: model.password,
                    roles: roles
                };
                UserService.createUser(newUser)
                    .then(function (response) {
                        loadAllUsers();
                        model.username = "";
                        model.password = "";
                        model.rolesText = "";
                    });
            }

        }

        function updateUser() {
            var newUser = {
                username: model.username,
                password: model.password,
                roles: model.rolesText.split(",")
            }
            UserService.updateUser(model.user._id, newUser)
                .then(function (response) {
                    loadAllUsers();
                })
        }

        function deleteUser(user) {
            UserService.deleteUserById(user._id)
                .then(function (response) {
                    loadAllUsers();
                });
        }

        function editUser(user) {
            //console.log(user);
            model.user = user;
            model.username = user.username;
            model.password = user.password;
            model.rolesText = user.roles;
        }
    }
})();