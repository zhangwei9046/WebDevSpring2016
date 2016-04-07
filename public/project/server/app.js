/**
 * Created by ying on 4/7/16.
 */
module.exports = function(app, db, mongoose) {
    require("./services/product.service.server.js")(app);
}