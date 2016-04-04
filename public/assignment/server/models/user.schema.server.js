/**
 * Created by ying on 4/1/16.
 */
"use strict";
module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        "username": String,
        "password": String,
        "firstName": String,
        "lastName": String,
        "emails": String,
        "phones": String
    },{collection: "user"});

    return UserSchema;
}