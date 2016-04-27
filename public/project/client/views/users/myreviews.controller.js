/**
 * Created by ying on 4/24/16.
 */
(function () {
    angular
        .module("ReviewApp")
        .controller("MyreviewsController", MyreviewsController);

    function MyreviewsController($rootScope, ProductService, ReviewService) {
        var model = this;
        model.deleteReview = deleteReview;
        getReviews();

        function getReviews() {
            ReviewService
                .getReviewsByUsername($rootScope.user.username)
                .then(
                    function (response) {
                        if (!response.data || response.data.length == 0) {
                            model.err = "You haven't reviewed any product. Go search some!";
                        } else {
                            model.reviews = response.data;
                            console.log(model.reviews);
                        }
                    },
                    function (err) {
                        model.err = "Err";
                    }
                )
        }

        function deleteReview(reviewId) {
            ReviewService
                .deleteReview(reviewId)
                .then(
                    function (response) {
                        model.reviews = null;
                        getReviews();
                    },
                    function (err) {
                        model.err = "Err";
                    }
                )
        }
    }
})();