/**
 * Created by ying on 4/21/16.
 */
(function() {
    angular
        .module("ReviewApp")
        .controller("DetailController", DetailController);

    function DetailController($http, $routeParams) {
        var model = this;
        model.getProduct = getProduct;
        getProduct();
        function getProduct() {
            console.log("ddd");
            var sku = $routeParams.sku;
            $http.get("/api/project/product/" + sku)
                .success(
                    function(response) {
                        model.product = response[0];
                        console.log(model.product);
                    }
                )
        }
    }
})();