/**
 * Created by ying on 4/6/16.
 */
"use strict";
(function () {
    angular
        .module("ReviewApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            //.when("/search", {
            //    templateUrl: "views/search/search.view.html",
            //    controller: "SearchController",
            //    controllerAs: "model"
            //})
            .when("/search/:query", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/signin", {
                templateUrl: "views/users/signin.view.html",
                controller: "SigninController",
                controllerAs: "model"
            })
            .when("/signup", {
                templateUrl: "views/users/signup.view.html",
                controller: "SignupController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            })
    }
})();