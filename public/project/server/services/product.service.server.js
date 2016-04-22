/**
 * Created by ying on 4/7/16.
 */
"use strict";
module.exports = function (app, bby) {
    app.get("/api/project/product/search=:query", searchProducts);
    app.get("/api/project/product/:sku", getProductBySku);

    function searchProducts(req, res) {
        var query = req.params.query;
        bby.products('name=' + query + '*&active=true',
            {show: "name,type,sku,salePrice,url,categoryPath,freeShippingEligible,largeImage,shortDescription,longDescription,customerReviewAverage,addToCartUrl"})
            .then(function (data) {
                res.json(data.products);
            });
    }

    function getProductBySku(req, res) {
        var sku = req.params.sku;
        bby.products('sku=' + sku +'&active=true',
            {show: "name,type,sku,salePrice,url,categoryPath,freeShippingEligible,largeImage,shortDescription,longDescription,customerReviewAverage,addToCartUrl"})
            .then(function(data) {
                res.json(data.products);
            }
        )
    }
}