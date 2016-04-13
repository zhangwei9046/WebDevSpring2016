/**
 * Created by ying on 4/10/16.
 */
(function() {
    angular
        .module("SearchController", SearchController);

    function SearchController() {
        model.search = search;

        function search() {
            ProductService.searchProducts(model.searchCriteria)
                .then(function(response) {
                    model.products = response;
                })
        }
    }
})();