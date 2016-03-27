/**
 * Created by ying on 3/15/16.
 */
"use strict";
module.exports = function (app, model, db) {
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user/username=:username", findUserByUsername);
    app.get("/api/assignment/user/username=:username&password=:password", findUserByCredentials);
    app.get("api/assignment/user", findAllUsers);
    app.post("api/assignment/user", createUser);
    app.put("api/assignment/user/:id", updateUser);
    app.delete("api/assignment/user/:id", deleteUser);

    function findUserById(req, res) {
        var userId = req.param.id;
        userModel.findUserById(userId)
            .then(function (user) {
                res.json(user);
            })
    }

    function findUserByUsername(req, res) {
        var username = req.param.username;
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            })
    }

    function findUserByCredentials(req, res) {
        var username = req.param.username;
        var password = req.param.password;
        var credentials = {
            username: username,
            password: password
        }
        userModel
            .findUserByCredentials(credentials)
            .then(function (user) {
                res.json(user);
            })
    }

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            })
    }

    function createUser(req, res) {
        var newUser = req.body;
        userModel
            .createUser(newUser)
            .then(function (users) {
                res.json(users);
            })
    }

    function updateUser(req, res) {
        var userId = req.param.id;
        var userObj = req.body;
        userModel
            .updateUser(userObj)
            .then(function (user) {
                res.json(user);
            })
    }

    function deleteUser(req, res) {
        var userId = req.param.id;
        userModel
            .deleteUser(userId)
            .then(function (users) {
                res.json(users);
            })
    }
}