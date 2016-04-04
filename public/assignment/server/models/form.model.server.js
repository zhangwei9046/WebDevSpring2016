/**
 * Created by ying on 3/15/16.
 */
"use strict";
var q = require("q");
var uuid = require("node-uuid");
module.exports = function (mongoose, app) {
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model("FormModel", FormSchema);

    var api = {
        //form api
        findFormById: findFormById,
        //findFormByTitle: findFormByTitle,
        findAllForms: findAllForms,
        findAllFormsForUser: findAllFormsForUser,
        createForm: createForm,
        updateForm: updateForm,
        deleteForm: deleteForm,

        //field api
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldByFieldIdForForm: findFieldByFieldIdForForm,
        createFieldForForm: createFieldForForm,
        updateFieldForForm: updateFieldForForm,
        deleteFieldForForm: deleteFieldForForm
    };
    return api;

    //form
    function findFormById(formId) {
        var deferred = q.defer();
        FormModel.findById({id: formId}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        })
        return deferred.promise;
    }

    //function findFormByTitle(title) {
    //    var deferred = q.defer();
    //    for (var i = 0; i < forms.length; i++) {
    //        if (forms[i].title == title) {
    //            deferred.resolve(forms[i]);
    //            return form[i];
    //        }
    //    }
    //    return deferred.promise;
    //}

    function findAllForms() {
        var deferred = q.defer();
        FormModel.find(function (err, forms) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        })
        return deferred.promise;
    }

    function findAllFormsForUser(userId) {
        var deferred = q.defer();
        FormModel.find({id: formId}, function (err, forms) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        })
        return deferred.promise;
    }

    function createForm(newForm) {
        var deferred = q.defer();
        newForm.id = uuid.v1();
        newForm.fields = [];
        FormModel.create(newForm, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function updateForm(formId, formObj) {
        var deferred = q.defer();
        var i;
        for (i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                forms[i].title = formObj.title;
                //forms[i].userId = formObj.userId;
                //forms[i].fields = formObj.fields;
                deferred.resolve(forms[i]);
                break;
            }
        }
        return deferred.promise;
    }

    function deleteForm(formId) {
        console.log(formId);
        var deferred = q.defer();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                forms.splice(i, 1);
                deferred.resolve(forms);
            }
        }
        return deferred.promise;
    }

    //field
    function findAllFieldsForForm(formId) {
        var deferred = q.defer();
        var i;
        for (i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                deferred.resolve(forms[i].fields);
                break;
            }
        }
        if (i == forms.length) {
            deferred.resolve(null);
        }
        return deferred.promise;
    }

    function findFieldByFieldIdForForm(fieldId, formId) {
        var deferred = q.defer();
        var i, j;
        for (i = 0; i < forms.length; i++) {
            if (forms[i].id = formId) {
                for (j = 0; j < forms.length; j++) {
                    if (forms[i].fields[j].id = fieldId) {
                        deferred.resolve(forms[i].fields[j]);
                    }
                }
                if (j == forms[i].length) {
                    deferred.resolve(null);
                }
            }
        }
        if (i == forms.length) {
            deferred.resolve(null);
        }
        return deferred.promise;
    }

    function createFieldForForm(formId, fieldObj) {
        console.log(formId);
        console.log(fieldObj);
        var deferred = q.defer();
        fieldObj.id = uuid.v1();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                console.log(forms[i]);
                forms[i].fields.push(fieldObj);
                deferred.resolve(forms[i].fields);
            }
        }
        return deferred.promise;
    }

    function updateFieldForForm(formId, fieldId, fieldObj) {
        var deferred = q.defer();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                for (var j = 0; j < forms[i].fields.length; j++) {
                    if (forms[i].fields[j].id == fieldId) {
                        forms[i].fields[j].label = fieldObj.label;
                        forms[i].fields[j].placeholder = fieldObj.placeholder;
                        forms[i].fields[j].options = fieldObj.options;
                        //console.log(forms[i].fields);
                        deferred.resolve(forms[i].fields);
                    }
                }
            }
        }
        return deferred.promise;
    }

    //fieldId is the index of the field, not Id
    function deleteFieldForForm(formId, fieldId) {
        var deferred = q.defer();
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                forms[i].fields.splice(fieldId, 1);
                deferred.resolve(forms[i].fields);
            }
        }
        return deferred.promise;
    }
};
