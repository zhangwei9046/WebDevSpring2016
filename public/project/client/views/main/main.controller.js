/**
 * Created by ying on 4/19/16.
 */
"use strict";
(function () {
    angular
        .module("ReviewApp")
        .controller("MainController", mainController);

    function mainController($scope, $location) {
        $scope.$location = $location;
    }

})();