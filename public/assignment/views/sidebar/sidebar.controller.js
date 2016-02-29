/**
 * Created by ying on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", sidebarController);
    function sidebarController($scope, $rootScope) {
        $scope.loggedIn = loggedIn;
        $scope.admin = admin;

        function loggedIn() {
            return $rootScope.user != null;
        }

        function admin() {
            if ($rootScope.user == null) {
                return false;
            }
            if ($rootScope.user.roles == null) {
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