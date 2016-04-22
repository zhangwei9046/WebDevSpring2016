/**
 * Created by ying on 4/22/16.
 */
module.exports = function (mongoose, db) {
    var ReviewSchema = require("./review.schema.server.js")(mongoose);
    var ReviewModel = mongoose.model("ReviewModel", ReviewSchema);

    var api = {
        findReviewById: findReviewById,
        findReviewByUsername: findReviewByUsername,
        findReviewBySku: findReviewBySku,
        createReview: createReview,
        deleteReview: deleteReview
    }
    return api;

    function findReviewById(reviewId) {
        return ReviewModel.findOne({_id: reviewId});
    }

    function findReviewByUsername(username) {
        return ReviewModel.findOne({username: username});
    }

    function findReviewBySku(sku) {
        return ReviewModel.find({sku: sku});
    }

    function createReview(newReview) {
        console.log(newReview);
        return ReviewModel.create(newReview);
    }

    function deleteReview(reviewId) {
        return ReviewModel.remove({_id: reviewId});
    }
}