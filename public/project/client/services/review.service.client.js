/**
 * Created by ying on 4/22/16.
 */
(function() {
    angular
        .module("ReviewApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {
        var api= {
            getReviewsByUsername: getReviewsByUsername,
            getReviewBySku: getReviewBySku,
            createReview: createReview,
            deleteReview: deleteReview
        };
        return api;

        function getReviewsByUsername(username) {
            return $http.get("/api/project/user/" + username + "/review");
        }

        function getReviewBySku(sku) {
            return $http.get("/api/project/review/sku=" + sku);
        }

        function createReview(newReview) {
            return $http.post("/api/project/review", newReview);
        }

        function deleteReview(reviewId) {
            return $http.delete("/api/project/review/" + reviewId);
        }
    }
})();