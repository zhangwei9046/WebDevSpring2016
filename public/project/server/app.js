/**
 * Created by ying on 4/7/16.
 */
"use strict";
module.exports = function (app, db, mongoose, passport, LocalStrategy) {
    var bby = require('bestbuy')('sm5ezt63vms33f8q33tp6bxv');
    require("./services/product.service.server.js")(app, bby);

    var userModel = require("./models/user.model.server.js")(mongoose, db);
    require("./services/user.service.server.js")(app, userModel, passport, LocalStrategy);
};