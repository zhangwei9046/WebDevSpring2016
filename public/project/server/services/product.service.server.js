/**
 * Created by ying on 4/7/16.
 */
"use strict";
module.exports = function (app, bby) {
    app.get("/api/project/product/search=:query", searchProducts);
    function searchProducts(req, res) {
        var query = req.params.query;
        bby.products('name=' + query + '*&active=true',
            {show: "name,type,sku,salePrice,url,categoryPath,freeShippingEligible,largeImage,shortDescription,customerReviewAverage,addToCartUrl"})
            .then(function (data) {
                res.json(data.products);
            });
    }
}