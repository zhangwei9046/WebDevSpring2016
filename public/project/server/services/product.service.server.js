/**
 * Created by ying on 4/7/16.
 */
"use strict";
module.exports = function(app) {
    app.get("/api/project/product/search=:criteria", searchProducts);

    function searchProducts(req, res) {
        var searchCriteria = req.params.criteria;
        console.log(searchCriteria);

    }
}