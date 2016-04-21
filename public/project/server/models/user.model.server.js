/**
 * Created by ying on 4/19/16.
 */
"use strict";
module.exports = function (mongoose, db) {
    var ProjectUserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model("ProjectUserModel", ProjectUserSchema);

    var api = {
        findUserByUsername: findUserByUsername,
        findUserByCredential: findUserByCredential,
        findAllUsers: findAllUsers,
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function findUserByCredential(credentials) {
        return UserModel.findOne({username: credentials.username, password: credentials.password});
    }

    function findAllUsers() {
        return UserModel.find();
    }

    function createUser(newUser) {
        return UserModel.create(newUser);
    }

    function updateUser(userId, userObj) {
        delete userObj["_id"];
        return UserModel.findOneAndUpdate({_id: userId}, userObj, {new: true});
    }

    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    }
};
