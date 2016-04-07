/*Created by ying on 2/25/16.*/
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http, $q) {
        var api = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUserByUsername(username) {
            var deferred = $q.defer();
            console.log(username);
            $http.get("/api/assignment/user/username=" + username)
                .success(function (user) {
                    deferred.resolve(user);
                });
            return deferred.promise;
        }

        function findUserByCredentials(username, password) {

            var deferred = $q.defer();
            $http.get("/api/assignment/user/username=" + username + "&password=" + password)
                .success(function (user) {
                    deferred.resolve(user);
                });
            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();
            $http.get("/api/assignment/user")
                .success(function (users) {
                    deferred.resolve(users);
                })
            return deferred.promise;
        }

        function createUser(newUser) {
            var deferred = $q.defer();
            $http.post("/api/assignment/user", newUser)
                .success(function (newUser) {
                    deferred.resolve(newUser);
                })

            return deferred.promise;
        }

        function deleteUserById(userId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/user/" + userId)
                .success(function (users) {
                    deferred.resolve(users);
                })
            return deferred.promise;
        }

        function updateUser(userId, userObj) {
            var deferred = $q.defer();
            $http.put("/api/assignment/user/" + userId, userObj)
                .success(function (user) {
                    console.log(user);
                    deferred.resolve(user);
                })
            return deferred.promise;
        }
    }
})();