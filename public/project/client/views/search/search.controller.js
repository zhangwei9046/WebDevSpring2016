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
        //model.progress = progress;

        search(model.query);

        function search(query) {
            ProductService.searchProducts(query)
                .then(function(response) {
                    console.log(response);
                    if (!response.data.products || response.data.products.length == 0) {
                        model.err = "No results! Try another keyword!";
                    } else {
                        model.products = response.data.products;
                    }
                })
        }

        //function progress(product) {
        //    return "width:" + (product.customerReviewAverage * 20) + "%";
        //}
    }
})();