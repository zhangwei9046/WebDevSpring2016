/* Created by ying on 2/20/16.*/
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);
    function adminController($rootScope, UserService) {
        var model = this;

        model.predicate = 'username';
        model.reverse = false;

        model.addUser = addUser;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.editUser = editUser;
        model.order = order;

        loadAllUsers();

        function loadAllUsers() {
            UserService.findAllUsers()
                .then(function (response) {
                    model.users = response;
                });
        }

        function addUser() {
            if (model.username && model.password) {
                if (!model.rolesText) {
                    model.rolesText = "student";
                } else {
                    model.rolesText = "student," + model.rolesText;
                }
                var roles = model.rolesText.split(",");
                var newUser = {
                    username: model.username,
                    password: model.password,
                    firstName: model.firstname,
                    lastName: model.lastname,
                    roles: roles
                };
                UserService.createUser(newUser)
                    .then(function (response) {
                        loadAllUsers();
                        model.username = "";
                        model.password = "";
                        model.firstname = "";
                        model.lastname = "";
                        model.rolesText = "";
                    });
            }

        }

        function updateUser() {
            var rolesText = model.rolesText + "";
            var roles = (rolesText).split(",");
            var newUser = {
                username: model.username,
                password: model.password,
                firstName: model.firstname,
                lastName: model.lastname,
                roles: roles
            };
            UserService.updateUser(model.user._id, newUser)
                .then(function (response) {
                    loadAllUsers();
                    model.user = null;
                    model.username = "";
                    model.password = "";
                    model.firstname = "";
                    model.lastname = "";
                    model.rolesText = "";
                });
        }

        function deleteUser(user) {
            if (user._id != $rootScope.user._id) {
                UserService.deleteUserById(user._id)
                    .then(function (response) {
                        loadAllUsers();
                    });
            } else {
                alert("You cannot delete yourself!");
            }
        }

        function editUser(user) {
            //console.log(user);
            model.user = user;
            model.username = user.username;
            model.password = user.password;
            model.firstname = user.firstName;
            model.lastname = user.lastName;
            model.rolesText = user.roles;
        }

        function order(predicate) {
            model.reverse = (model.predicate === predicate) ? !model.reverse : false;
            model.predicate = predicate;
        }
    }
})();