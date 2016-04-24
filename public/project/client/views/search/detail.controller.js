/**
 * Created by ying on 4/21/16.
 */
(function() {
    angular
        .module("ReviewApp")
        .controller("DetailController", DetailController);

    function DetailController($http, $rootScope, $routeParams, ReviewService, UserService) {
        var model = this;
        model.getProduct = getProduct;
        model.getReview = getReviews;
        model.addReview = addReview;
        model.like = like;
        //model.isliked = ;

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

        function like() {
            UserService
                .addFavoritesForUser($rootScope.user.username, model.product)
                .then(
                    function(response) {
                        console.log(response);

                    },
                    function(err) {
                        model.err = "Err";
                    }
                )
        }

        function isliked() {
            var username = $rootScope.user.username;
            UserService.getProductFromUser(username, $routeParams.sku)
                .then(
                    function(response) {
                        model.test = response;
                    },
                    function(err) {
                        model.err ="Err";
                    }
                )
        }
    }
})();