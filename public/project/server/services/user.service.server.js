/**
 * Created by ying on 4/19/16.
 */
"use strict";
module.exports = function (app, model, passport, LocalStrategy) {
    app.post("/api/project/signup", signup);
    app.post("/api/project/signin", passport.authenticate('local'), signin);
    app.get("/api/project/signedin", signedin);
    app.post("/api/project/signout", signout);

    app.get("/api/project/admin/user/:id", findUserById);
    app.get("/api/project/admin/user", findAllUsers);
    app.post("/api/project/admin/user", createUser);
    app.put("/api/project/admin/user/:id", updateUser);
    app.delete("/api/project/admin/user/:id", deleteUser);

    app.get("/api/project/user/:username/product/:sku", getProductFromUser);
    app.get("/api/project/user/:username/product", getAllProductsFromUser);
    app.post("/api/project/user/:username/product", createProductForUser);
    app.delete("/api/project/user/:username/product/:productId", deleteProductForUser);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    var auth = authorized;

    function localStrategy(username, password, done) {
        model
            .findUserByCredentials({username: username, password: password})
            .then(
                function (user) {
                    console.log(user);
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

    function signup(req, res) {
        var newUser = req.body;
        newUser.roles = ['user'];
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

    function signin(req, res) {
        var user = req.user;
        res.json(user);
    }

    function signedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function signout(req, res) {
        req.logOut();
        res.send(200);
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
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
                    console.log(users);
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

    function getProductFromUser(req, res) {
        var username = req.params.username;
        var sku = req.params.sku;
        console.log(model.getProductFromUser(username, sku));
        model
            .getProductFromUser(username, sku)
            .then(
                function (response) {
                    console.log(response);
                    res.json(response);
                },
                function (err) {
                    res.status(403).send();
                }
            )
    }

    function getAllProductsFromUser(req, res) {
        var username = req.params.username;
        //console.log(username);
        model.getAllProductsFromUser(username)
            .then(
                function (favorites) {
                    res.json(favorites);
                },
                function (err) {
                    res.status(403).send();
                }
            )
    }

    function createProductForUser(req, res) {
        var username = req.params.username;
        var newProduct = req.body;
        model
            .createProductForUser(username, newProduct)
            .then(
                function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(403).send();
                }
            )
    }

    function deleteProductForUser(req, res) {
        var username = req.params.username;
        var productId = req.params.productId;
        model.deleteProductForUser(username, productId)
            .then(
                function(response) {
                    res.json(response);
                },
                function(err) {
                    res.status(403).send();
                }
            )
    }
};