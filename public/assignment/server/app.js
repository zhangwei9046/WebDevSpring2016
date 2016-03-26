/**
 * Created by ying on 3/15/16.
 */
module.exports = function (app, db) {
    var model = require("./models/user.model.js")(mongoose, db);
    require("./services/user.service.server.js")(app, model);

    var formModel = require("./models/form.model.js")(mongoose, db);
    require("./services/form.service.server.js")(app, formModel);

    require("./services/field.service.server.js")(app, formModel);
}