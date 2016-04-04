/**
 * Created by ying on 3/15/16.
 */
"use strict";
var q = require("q");
var uuid = require("node-uuid");

module.exports = function (mongoose, db) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema);
    var users = require('./user.mock.json');
    var api = {
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser
    };
    return api;

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById({id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
            }
            deferred.resolve(user);
        })
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel.findOne({username: credentials.username, password: credentials.password}, function (err, users) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        userModel.find(function (err, users) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function createUser(newUser) {
        var deferred = q.defer();
        newUser.id = uuid.v1();
        UserModel.create(newUser, function (err, user) {
            console.log(user);
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel.remove({id: userId}, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, userObj) {
        var deferred = q.defer();
        UserModel.update({id: userId}, {$set: userObj}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                UserModel.findOne({id: userId}, function (err, user) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                });
            }
        });
        return deferred.promise;
    }
};
