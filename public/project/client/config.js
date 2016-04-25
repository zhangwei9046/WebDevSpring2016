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
                controllerAs: "model",
                resolve: {signedin: checkSignedin}
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
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {signedin: checkSignedin}
            })
            .when("/review/:sku", {
                templateUrl: "views/search/detail.view.html",
                controller: "DetailController",
                controllerAs: "model",
                resolve: {signedin: checkSignedin}
            })
            .when("/favorites", {
                templateUrl: "views/users/favorites.view.html",
                controller: "FavoritesController",
                controllerAs: "model",
                resolve: {signedin: checkSignedin}
            })
            .when("/myreviews", {
                templateUrl: "views/users/myreviews.view.html",
                controller: "MyreviewsController",
                controllerAs: "model",
                resolve: {signedin: checkSignedin}
            })
            .otherwise({
                redirectTo: "/signin"
            })
    }

    var checkAdmin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/project/signedin').success(function (user) {
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1) {
                $rootScope.user = user;
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    };


    var checkSignedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/project/signedin').success(function (user) {
            console.log(user);
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.user = user;
                deferred.resolve(user);
            }
            // User is Not Authenticated
            else {
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

})();