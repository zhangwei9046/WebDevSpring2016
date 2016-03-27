/**
 * Created by ying on 3/15/16.
 */
module.exports = function (app) {
    var userModel = require("./models/user.model.js");
    var userService = require("./services/user.service.server.js")(app, userModel);

    var formModel = require("./models/form.model.js");

    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);
}