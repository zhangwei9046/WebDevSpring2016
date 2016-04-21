/**
 * Created by ying on 4/7/16.
 */
(function () {
    angular
        .module("ReviewApp")
        .factory("ProductService", ProductService);

    function ProductService($http, $q) {
        var api = {
            searchProducts: searchProducts
        }
        return api;

        function searchProducts(query) {
            var deferred = $q.defer();
            $http.get("/api/project/product/search=" + query)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();