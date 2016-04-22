/**
 * Created by ying on 4/19/16.
 */
"use strict";
(function() {
    angular
        .module("ReviewApp")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            signup: signup,
            signin: signin,
            signedin: signedin,
            signout: signout,

            findAllUsers: findAllUsers,
            createUser: createUser,
            updateUser: updateUser,
            deleteUserById: deleteUserById
        };
        return api;

        function signup(user) {
            return $http.post("/api/project/signup", user);
        }

        function signin(user) {
            return $http.post("/api/project/signin", user);
        }

        function signedin() {
            return $http.get("/api/project/signedin");
        }

        function signout() {
            return $http.post("/api/project/signout");
        }

        function findAllUsers() {
            return $http.get("/api/project/admin/user");
        }

        function createUser(newUser) {
            return $http.post("/api/project/admin/user", newUser);
        }

        function updateUser(userId, userObj) {
            return $http.put("/api/project/admin/user/" + userId, userObj);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/admin/user/"+ userId);
        }
    }
})();