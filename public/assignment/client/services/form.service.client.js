/**
 * Created by ying on 2/25/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);
    function formService($http, $q) {
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234}
        ];

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return api;

        function createFormForUser(userId, form) {
            var deferred = $q.defer();
            $http.post("api/assignment/user/form", newForm)
                .
            var newForm = {
                "_id": (new Date).getTime(),
                "title": form.title,
                "userId": form.userId
            };
            forms.push(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback) {
            var newForms = [];
            for (var i = 0; i < forms.length; i++) {
                if (forms[i].userId == userId) {
                    newForms.push(forms[i]);
                }
            }
            callback(newForms);
        }

        function deleteFormById(formId, callback) {
            for (var i = 0; i < forms.length; i++) {
                if (forms[i]._id == formId) {
                    forms.splice(i, 1);
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            var i;
            for (i = 0; i < forms.length; i++) {
                if (forms[i]._id == formId) {
                    forms[i].title = newForm.title;
                    //forms[i].userId = newForm.userId;
                    break;
                }
            }
            callback(forms[i]);
        }
    }
})();