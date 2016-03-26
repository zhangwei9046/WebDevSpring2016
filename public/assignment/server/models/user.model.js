/**
 * Created by ying on 3/15/16.
 */
"use strict";
module.exports = function (app, db) {
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
        for (var i = 0; i < users.length; i++) {
            if (users[i].id = userId) {
                return users[i];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].username = username) {
                return users[i];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == username) {
                if (users[i].password == password) {
                    var user = users[i];
                    return user;
                }
            }
        }
        return null;
    }

    function findAllUsers() {
        return users;
    }

    function createUser(newUser) {
        users.push(newUser);
    }

    function deleteUser(userId) {
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == userId) {
                users.splice(i, 1);
                break;
            }
        }
    }

    function updateUser(userId, userObj) {
        var i;
        for (i = 0; i < users.length; i++) {
            if (users[i]._id == userId) {
                users[i].username = user.username;
                users[i].password = user.password;
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                users[i].email = user.email;
                break;
            }
        }
    }
};
