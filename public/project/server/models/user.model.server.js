/**
 * Created by ying on 4/19/16.
 */
"use strict";
module.exports = function (mongoose, db) {
    var ProjectUserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model("ProjectUserModel", ProjectUserSchema);

    var api = {
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function findUserById(userId) {
        return UserModel.findOne({_id: userId});
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function findUserByCredentials(credentials) {
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
        //console.log(userId);
        return UserModel.remove({_id: userId});
    }
};
