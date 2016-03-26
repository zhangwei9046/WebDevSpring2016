/**
 * Created by ying on 2/25/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);
    function userService() {
        var users = [
            {
                "_id": 123,
                "firstName": "Alice",
                "lastName": "Wonderland",
                "username": "alice",
                "password": "alice",
                "roles": ["student"]
            },
            {
                "_id": 234,
                "firstName": "Bob",
                "lastName": "Hope",
                "username": "bob",
                "password": "bob",
                "roles": ["admin"]
            },
            {
                "_id": 345,
                "firstName": "Charlie",
                "lastName": "Brown",
                "username": "charlie",
                "password": "charlie",
                "roles": ["faculty"]
            },
            {
                "_id": 456,
                "firstName": "Dan",
                "lastName": "Craig",
                "username": "dan",
                "password": "dan",
                "roles": ["faculty", "admin"]
            },
            {
                "_id": 567,
                "firstName": "Edward",
                "lastName": "Norton",
                "username": "ed",
                "password": "ed",
                "roles": ["student"]
            }
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUserByCredentials(username, password, callback) {
            var user;
            for (var i = 0; i < users.length; i++) {
                if (users[i].username == username) {
                    if (users[i].password == password) {
                        user = users[i];
                        callback(user);
                    }
                }
            }
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            var newUser = {
                _id: (new Date).getTime(),
                username: user.username,
                password: user.password,
                email: user.email
            }

            users.push(newUser);
            console.log(users);
            callback(newUser);
        }

        function deleteUserById(userId, callback) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users.splice(i, 1);
                    break;
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback) {
            var i;
            for (i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users[i].username = user.username;
                    users[i].password = user.password;
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    users[i].email = user.email;
                    break;
                }
            }
            console.log(users);
            callback(users[i]);
        }
    }
})();