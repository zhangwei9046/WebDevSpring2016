/**
 * Created by ying on 4/19/16.
 */
"use strict";
module.exports = function (app, model, passport, LocalStrategy) {
    app.post("/api/project/signup", signup);
    app.post("/api/project/signin", passport.authenticate('local'), signin);
    app.get("/api/project/signedin", signedin);
    app.post("/api/project/signout", signout);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

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
};