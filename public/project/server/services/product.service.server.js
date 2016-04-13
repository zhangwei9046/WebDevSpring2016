/**
 * Created by ying on 4/7/16.
 */
"use strict";
module.exports = function (app, bby) {
    app.get("/api/project/product/search=:criteria", searchProducts);
    function searchProducts(req, res) {
        var searchCriteria = req.params.criteria;
        bby.products('search=' + searchCriteria, {show: "name,type,salePrice,url,categoryPath,freeShippingEligible,largeImage,shortDescription"})
            .then(function (data) {
                res.json(data.products);
            });
    }
}