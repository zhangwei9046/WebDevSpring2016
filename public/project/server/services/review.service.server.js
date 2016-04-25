/**
 * Created by ying on 4/22/16.
 */
module.exports = function(app, model) {
    app.get("/api/project/user/:username/review", findReviewsByUsername);
    app.get("/api/project/review/sku=:sku", findReviewBySku);
    app.post("/api/project/review", createReview);
    app.delete("/api/project/review/:id", deleteReview);

    function findReviewsByUsername(req, res) {
        var username = req.params.username;
        model.findReviewsByUsername(username)
            .then(
                function(reviews) {
                    res.json(reviews);
                },
                function(err) {
                    res.status(400).send();
                }
            )
    }

    function findReviewBySku(req, res) {
        var sku = req.params.sku;
        model
            .findReviewBySku(sku)
            .then(
                function(reviews) {
                    res.json(reviews);
                },
                function(err){
                    res.status(400).send();
                }
            )
    }

    function createReview(req, res) {
        var newReview = req.body;
        //console.log(newReview);
        model
            .createReview(newReview)
            .then(
                function(response) {
                    res.json(response);
                },
                function(err) {
                    res.status(400).send();
                }
            )
    }

    function deleteReview(req, res) {
        var reviewId = req.params.id;
        model
            .deleteReview(reviewId)
            .then(
                function(response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send();
                }
            )
    }
};