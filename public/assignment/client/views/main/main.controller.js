/*Created by ying on 2/21/16.*/
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("MainController", mainController);

    function mainController($scope, $location) {
        $scope.$location = $location;
    }

})();