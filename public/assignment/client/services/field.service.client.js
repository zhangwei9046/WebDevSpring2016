/**
 * Created by ying on 3/15/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService ($http, $q) {

        var api = {
            getFieldsForForm: getFieldsForForm,
            createNewFieldForForm: createNewFieldForForm,
            updateFieldForForm: updateFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm
        };
        return api;

        function getFieldsForForm (formId) {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/form/" + formId + "/field")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createNewFieldForForm (formId, newField) {
            var deferred = $q.defer();
            $http
                .post("/api/assignment/form/" + formId + "/field", newField)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }


        function updateFieldForForm(formId, fieldId, fieldObj) {
            console.log(fieldObj);
            var deferred = $q.defer();
            $http
                .put("/api/assignment/form/" + formId + "/field/" + fieldId, fieldObj)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        //fieldId is the index of the field, not Id
        function deleteFieldFromForm (formId, fieldId) {
            var deferred = $q.defer();
            $http
                .delete("/api/assignment/form/" + formId + "/field/" + fieldId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
}) ();