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

        function searchProdcuts(searchQuery) {
            var deferred = $q.defer();
            $http.get("/api/project/product/search=" + searchQuery)
                .success(function(response) {
                    deferred.resolve(user);
                });
            return deferred.promise;
        }
    }
})();