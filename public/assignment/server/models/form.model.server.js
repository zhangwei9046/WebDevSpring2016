/**
 * Created by ying on 3/15/16.
 */
"use strict";
var q = require("q");
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
        FormModel.findById({_id: formId}, function (err, form) {
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
        FormModel.find({userId: userId}, function (err, forms) {
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
        FormModel.update({_id: formId}, {$set: formObj}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                FormModel.findOne({_id: formId}, function (err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(form);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function deleteForm(formId) {
        //console.log(formId);
        var deferred = q.defer();
        FormModel.remove({_id: formId}, function (err, forms) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }


    //field
    function findAllFieldsForForm(formId) {
        var deferred = q.defer();
        FormModel.findById(formId, {fields: 1, _id: 0}, function (err, response) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve(response.fields);
        });
        return deferred.promise;
    }

    function findFieldByFieldIdForForm(fieldId, formId) {
        var deferred = q.defer();
        FormModel.find({"_id": formId}, function (err, form) {
            if (err)
                deferred.reject(err);
            else {
                form.fields.splice(fieldId, 1);
                form.save(function (err, form) {
                    deferred.resolve(form);
                });
            }
        });
        return deferred.promise;
    }

    function createFieldForForm(formId, fieldObj) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                form.fields.push(fieldObj);
                form.save(function (err, form) {
                    deferred.resolve(form);
                })
            }
        })
        return deferred.promise;
    }

    function updateFieldForForm(formId, fieldId, fieldObj) {
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                form.fields[fieldId] = fieldObj;
                form.save(function (err, form) {
                    deferred.resolve(form);
                })
            }
        })
        return deferred.promise;
    }

    //fieldId is the index of the field, not Id
    function deleteFieldForForm(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                form.fields.splice(fieldId, 1);
                form.save(function (err, form) {
                    deferred.resolve(form);
                })
                deferred.resolve(form);
            }
        })
        return deferred.promise;
    }
};
