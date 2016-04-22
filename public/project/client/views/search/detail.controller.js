/**
 * Created by ying on 4/21/16.
 */
(function() {
    angular
        .module("ReviewApp")
        .controller("DetailController", DetailController);

    function DetailController($http, $rootScope, $routeParams, ReviewService) {
        var model = this;
        model.getProduct = getProduct;
        model.getReview = getReviews;
        model.addReview = addReview;

        getProduct();
        getReviews();

        function getProduct() {
            var sku = $routeParams.sku;
            $http.get("/api/project/product/" + sku)
                .success(
                    function(response) {
                        model.product = response[0];
                        //console.log(model.product);
                    }
                )
        }

        function getReviews() {
            ReviewService
                .getReviewBySku($routeParams.sku)
                .then(
                    function(response) {
                        model.reviews = response.data;
                    },
                    function(err) {
                        model.err = "Err";
                    }
                )
        }

        function addReview() {
            var newReview = {
                username: $rootScope.user.username,
                sku: $routeParams.sku,
                content: model.newReview
            };
            ReviewService
                .createReview(newReview)
                .then(
                    function(response) {
                        //console.log(response);
                        getReviews();
                        console.log(model.reviews);
                    },
                    function(err) {
                        model.err = "Err";
                    }
                )
        }
    }
})();