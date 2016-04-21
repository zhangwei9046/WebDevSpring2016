/**
 * Created by ying on 4/19/16.
 */
"use strict";
(function() {
    angular
        .module("ReviewApp")
        .controller("HomeController", HomeController);

    function HomeController($location) {
        var model = this;
        model.search = search;

        function search(query) {
            $location.url("/search/" + query);
        }
    }
})();