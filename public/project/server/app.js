/**
 * Created by ying on 4/7/16.
 */
module.exports = function(app, db, mongoose) {
    var bby = require('bestbuy')('sm5ezt63vms33f8q33tp6bxv');
    require("./services/product.service.server.js")(app, bby);
}