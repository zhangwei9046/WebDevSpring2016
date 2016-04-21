/**
 * Created by ying on 4/10/16.
 */
"use strict";
(function() {
    angular
        .module("ReviewApp")
        .controller("SearchController", SearchController);

    function SearchController($routeParams, ProductService) {
        var model = this;
        model.search = search;
        model.query = $routeParams.query;

        search(model.query);

        function search(query) {
            ProductService.searchProducts(query)
                .then(function(response) {
                    console.log(response);
                    model.products = response;
                })
        }
    }
})();