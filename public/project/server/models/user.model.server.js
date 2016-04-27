/**
 * Created by ying on 4/19/16.
 */
"use strict";
var q = require("q");
module.exports = function (mongoose, db) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model("ProjectUserModel", UserSchema);

    var api = {
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser,

        getProductFromUser: getProductFromUser,
        getAllProductsFromUser: getAllProductsFromUser,
        createProductForUser: createProductForUser,
        deleteProductForUser: deleteProductForUser
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

    function getProductFromUser(username, sku) {
        var deferred = q.defer();
        UserModel
            .findOne({username: username}, function (err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    //console.log(user);
                    if (user) {
                        var flag = true;
                        for (var i = 0; i < user.favorites.length; i++) {
                            if (user.favorites[i].sku == sku) {
                                flag = false;
                                deferred.resolve(user.favorites[i]);
                            }
                        }
                        if (flag) {
                            deferred.reject(null);
                            console.log("yo");
                        }
                    }
                }
                deferred.reject(err);
            });
        return deferred.promise;
    }

    function getAllProductsFromUser(username) {
        var deferred = q.defer();
        UserModel
            .findOne({username: username})
            .then(
                function (user) {
                    deferred.resolve(user.favorites);
                },
                function (err) {
                    deferred.reject();
                }
            );
        return deferred.promise;
    }

    function createProductForUser(username, newProduct) {
        var deferred = q.defer();
        UserModel.findOne({username: username})
            .then(
                function (user) {
                    var i;
                    for (i = 0; i < user.favorites.length; i++) {
                        if (user.favorites[i].sku == newProduct.sku) {
                            break;
                        }
                    }
                    if (i == user.favorites.length) {
                        user.favorites.push(newProduct);
                    }
                    user.save()
                        .then(
                            function (response) {
                                deferred.resolve(response);
                            },
                            function (err) {
                                deferred.reject();
                            }
                        )
                }
            );
        return deferred.promise;
    }

    function deleteProductForUser(username, productId) {
        var deferred = q.defer();
        UserModel
            .findOne({username: username})
            .then(
                function (user) {
                    user.favorites.splice(productId, 1);

                    user.save(
                        function(err, response) {
                            deferred.resolve(response);
                        }
                    )
                }
            );
        return deferred.promise;
    }
}
;
