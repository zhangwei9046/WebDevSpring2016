/**
 * Created by ying on 3/15/16.
 */
var q = require("q");

module.exports = function (app) {
    var forms = require('./form.mock.json');

    var api = {
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        findAllForms: findAllForms,
        findAllFormsForUser: findAllFormsForUser,
        createForm: createForm,
        updateForm: updateForm,
        deleteForm: deleteForm
    };
    return api;

    function findFormById(formId) {
        var deferred = q.defer();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                deferred.resolve(forms[i]);
                return form[i];
            }
        }
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].title == title) {
                deferred.resolve(forms[i]);
                return form[i];
            }
        }
        return deferred.promise;
    }

    function findAllForms() {
        var deferred = q.defer();
        deferred.resolve(forms);
        return deferred.promise;
    }

    function findAllFormsForUser(userId) {
        var deferred = q.defer();
        var newForms;
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].userId == userId) {
                newForms.push(forms[i]);

            }
        }
        deferred.resolve(newForms);
        return deferred.promise;
    }

    function createForm(newForm) {
        var deferred = q.defer();
        forms.push(newForm);
        deferred.resolve(forms);
        return deferred.promise;
    }

    function updateForm(formId, formObj) {
        var deferred = q.defer();
        var i;
        for (i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                forms[i].title = formObj.title;
                forms[i].userId = formObj.userId;
                forms[i].fields = formObj.fields;
                deferred.resolve(forms[i]);
                break;
            }
        }
        return deferred.promise;
    }

    function deleteForm(formId) {
        var deferred = q.defer();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                forms.splice(i, 1);
                deferred.resolve(forms);
            }
        }
        return deferred.promise;
    }
}
