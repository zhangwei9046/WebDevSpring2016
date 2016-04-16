/* Created by ying on 3/15/16.*/

"use strict";
module.exports = function (app, model, passport, LocalStrategy) {
    //app.get("/api/assignment/user/username=:username&password=:password", findUserByCredentials);
    //app.get("/api/assignment/user/username=:username", findUserByUsername);
    app.get("/api/assignment/admin/user/:id", findUserById);
    app.get("/api/assignment/admin/user", findAllUsers);
    app.post("/api/assignment/admin/user", createUser);
    app.put("/api/assignment/admin/user/:id", updateUser);
    app.delete("/api/assignment/admin/user/:id", deleteUser);


    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/register", register);


    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    var auth = authorized;

    function localStrategy(username, password, done) {
        model
            .findUserByCredentials({username: username, password: password})
            .then(
                function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];
        model
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        return model.createUser(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        if (isAdmin(req.user)) {
            model
                .findUserById(userId)
                .then(function (user) {
                        res.json(user);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    //function findUserByUsername(req, res) {
    //    var username = req.params.username;
    //    if (isAdmin()) {
    //        model
    //            .findUserByUsername(username)
    //            .then(function (user) {
    //                    res.json(user);
    //                },
    //                function () {
    //                    res.status(400).send(err);
    //                });
    //    } else {
    //        res.status(403);
    //    }
    //}

    //function findUserByCredentials(req, res) {
    //    var username = req.params.username;
    //    var password = req.params.password;
    //    var credentials = {
    //        username: username,
    //        password: password
    //    };
    //    model
    //        .findUserByCredentials(credentials)
    //        .then(function (user) {
    //            res.json(user);
    //        })
    //}

    function findAllUsers(req, res) {
        if (isAdmin(req.user)) {
            model
                .findAllUsers()
                .then(function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function createUser(req, res) {
        var newUser = req.body;
        if (isAdmin(req.user)) {
            model
                .findUserByUsername(newUser.username)
                .then(function (user) {
                        if (!user) {
                            model.createUser(newUser)
                                .then(function (response) {
                                        res.json(response);
                                    },
                                    function (err) {
                                        res.status(400).send(err);
                                    })
                        } else {
                            res.json(null);
                        }
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }


        //model
        //    .createUser(newUser)
        //    .then(function (user) {
        //        res.json(user);
        //    })
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var userObj = req.body;

        if (isAdmin(req.user)) {
            model
                .updateUser(userId, userObj)
                .then(function (user) {
                    res.json(user);
                }, function (err) {
                    res.status(400).send();
                });
        } else {
            res.status(403);
        }

    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        if (isAdmin(req.user)) {
            model
                .deleteUser(userId)
                .then(function (users) {
                    res.json(users);
                });
        } else {
            res.status(403);
        }

    }

    function isAdmin(user) {
        if (user.roles && user.roles.indexOf("admin") >= 0) {
            return true;
        }
        return false;
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };
};

