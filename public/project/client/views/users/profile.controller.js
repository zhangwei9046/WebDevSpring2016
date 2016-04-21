/**
 * Created by ying on 4/20/16.
 */
(function() {
    angular
        .module("ReviewApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope) {
        var model = this;
        model.user = $rootScope.user;
    }
})();