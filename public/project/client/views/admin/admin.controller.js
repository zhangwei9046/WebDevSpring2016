/**
 * Created by ying on 4/21/16.
 */
(function () {
    angular
        .module("ReviewApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, UserService) {
        var model = this;
        model.addUser = addUser;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.editUser = editUser;
        model.order = order;

        loadAllUsers();

        function loadAllUsers() {
            UserService
                .findAllUsers()
                .then(
                    function (response) {
                        model.users = response.data;
                    },
                    function (err) {
                        model.err = "Error";
                    }
                )
        }

        function addUser() {
            if (model.username && model.password) {
                if (!model.rolesText) {
                    model.rolesText = "user";
                } else {
                    model.rolesText = "user," + model.rolesText;
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
            var roles = (model.rolesText).split(",");
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