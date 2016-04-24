/**
 * Created by ying on 4/6/16.
 */
"use strict";
(function () {
    angular
        .module("ReviewApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $scope, $location, UserService) {
        $scope.signedin = signedin;
        $scope.username = username;
        $scope.isAdmin = isAdmin;
        $scope.signout = signout;
        $scope.search = search;

        function search(query) {
            $location.url("/search/" + query);
        }

        function signedin() {
            return $rootScope.user != null;
        }

        function username() {
            if ($rootScope.user) {
                return $rootScope.user.username;
            }
        }

        function signout() {
            UserService.signout()
                .then(
                    function(response) {
                        $rootScope.user = null;
                    },
                    function(err) {

                    }
                )
        }

        function isAdmin() {
            if (!signedin()) {
                return false;
            }
            for (var i = 0; i < $rootScope.user.roles.length; i++) {
                if ($rootScope.user.roles[i] == "admin") {
                    return true;
                }
            }
            return false;
        }
    }
})();