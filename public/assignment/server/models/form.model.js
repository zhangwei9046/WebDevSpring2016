/**
 * Created by ying on 3/15/16.
 */
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
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].id == formId) {
                return form[i];
            }
        }
        return null;
    }

    function findFormByTitle(title) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].title == title) {
                return form[i];
            }
        }
        return null;
    }

    function findAllForms() {
        return forms;
    }

    function findAllFormsForUser(userId) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].userId == userId) {
                newForms.push(forms[i]);
            }
        }
    }

    function createForm(newForm) {
        forms.push(newForm);
        return forms;
    }

    function updateForm(formId, formObj) {
        var i;
        for (i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                forms[i].title = newForm.title;
                //forms[i].userId = newForm.userId;
                break;
            }
        }
        return forms[i];
    }

    function deleteForm(formId) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                forms.splice(i, 1);
            }
        }
        return forms;
    }
}
