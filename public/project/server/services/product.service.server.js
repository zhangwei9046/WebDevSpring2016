/**
 * Created by ying on 4/7/16.
 */
"use strict";
module.exports = function(app) {
    app.get("/api/project/product/search=:searchCriteria", searchProducts);
    
}