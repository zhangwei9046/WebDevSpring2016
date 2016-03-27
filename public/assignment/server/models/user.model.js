/**
 * Created by ying on 3/15/16.
 */
"use strict";
var q = require("q");

module.exports = function (app) {
    var users = require('./user.mock.json');
    console.log(users);
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
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == userId) {
                deferred.resolve(users[i]);
                break;
            }
        }
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == username) {
                deferred.resolve(users[i]);
                break;
            }
        }
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == username) {
                if (users[i].password == password) {
                    deferred.resolve(users[i]);
                    break;
                }
            }
        }
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        deferred.resolve(users);
        return deferred.promise;
    }

    function createUser(newUser) {
        var deferred = q.defer();
        users.push(newUser);
        deferred.resolve(users);
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == userId) {
                users.splice(i, 1);
                deferred.resolve(users);
                break;
            }
        }
        return deferred.promise;
    }

    function updateUser(userId, userObj) {
        var deferred = q.defer();
        var i;
        for (i = 0; i < users.length; i++) {
            if (users[i]._id == userId) {
                users[i].username = user.username;
                users[i].password = user.password;
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                users[i].email = user.email;
                deferred.resolve(users);
                break;
            }
        }
        return deferred.promise;
    }
};
