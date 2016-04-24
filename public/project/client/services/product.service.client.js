/**
 * Created by ying on 4/7/16.
 */
(function () {
    angular
        .module("ReviewApp")
        .factory("ProductService", ProductService);

    function ProductService($http, $q) {
        var api = {
            searchProducts: searchProducts,
            getProduct: getProduct
        };
        return api;

        //function searchProducts(query) {
        //    var deferred = $q.defer();
        //    $http.get("/api/project/product/search=" + query)
        //        .success(function(response) {
        //            deferred.resolve(response);
        //        });
        //    return deferred.promise;
        //}

        function searchProducts(query) {
            return $http.get("http://api.bestbuy.com/v1/products(name=" + query + "*%7Csku=1752654)?" +
                "show=sku,name,type,salePrice,url,categoryPath,freeShippingEligible,largeImage," +
                "shortDescription,longDescription,customerReviewAverage,addToCartUrl&pageSize=15&page=1&" +
                "apiKey=sm5ezt63vms33f8q33tp6bxv&format=json");
        }

        function getProduct(sku) {
            return $http.get("http://api.bestbuy.com/v1/products(sku in(" + sku + "))?apiKey=sm5ezt63vms33f8q33tp6bxv&format=json");
        }
    }
})();