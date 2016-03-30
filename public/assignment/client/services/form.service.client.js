/* Created by ying on 2/25/16.*/
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);
    function formService($http, $q) {
        var api = {
            createFormForUser: createFormForUser,
            findFormById: findFormById,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return api;

        function createFormForUser(newForm) {
            var deferred = $q.defer();
            newForm.id = (new Date).getTime();
            $http.post("/api/assignment/user/form", newForm)
                .success(function (forms) {
                    deferred.resolve(forms);
                })
            return deferred.promise;
        }

        function findFormById(formId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formId)
                .success(function (response) {
                    //console.log(response);
                    deferred.resolve(response);
                })
            return deferred.promise;
        }

        function findAllFormsForUser(userId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user/" + userId + "/form")
                .success(function (forms) {
                    deferred.resolve(forms);
                })
            return deferred.promise;
        }

        function deleteFormById(formId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/" + formId)
                .success(function (forms) {
                    deferred.resolve();
                })
            return deferred.promise;
        }

        function updateFormById(formId, newForm) {
            var deferred = $q.defer();
            $http.put("/api/assignment/form/" + formId, newForm)
                .success(function (forms) {
                    deferred.resolve();
                })
            return deferred.promise;
        }
    }
})();