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
            signin: signin
        };
        return api;

        function signup(user) {
            return $http.post("/api/project/signup", user);
        }

        function signin(user) {
            return $http.post("api/project/signin", user);
        }
    }
})();