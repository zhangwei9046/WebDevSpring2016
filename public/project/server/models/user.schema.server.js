/**
 * Created by ying on 4/19/16.
 */
"use strict";
module.exports = function(mongoose) {
    var ProjectUserSchema = mongoose.Schema({
        "username": String,
        "password": String,
        "firstName": String,
        "lastName": String,
        "email": String,
        "phones": String,
        "roles": [String]
    },{collection: "project.user"});

    return ProjectUserSchema;
}