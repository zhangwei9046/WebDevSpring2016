/*Created by ying on 3/15/16. ...*/
module.exports = function (app, db, mongoose) {
    var userModel = require("./models/user.model.server.js")(mongoose, db);
    require("./services/user.service.server.js")(app, userModel);

    var formModel = require("./models/form.model.server.js")(mongoose, db);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/field.service.server.js")(app, formModel);
};