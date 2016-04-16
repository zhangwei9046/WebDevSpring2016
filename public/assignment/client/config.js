/**
 * Created by ying on 2/21/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {loggedin: checkAdmin}
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .otherwise({
                redirectTo: "/home"
            })
    }

    var checkAdmin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/assignment/loggedin').success(function (user) {
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1) {
                $rootScope.user = user;
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/assignment/loggedin').success(function (user) {
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
