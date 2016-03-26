/**
 * Created by ying on 3/15/16.
 */
module.exports = function(app, db) {
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

    }

    function findFormByTitle(title) {

    }

    function findAllForms() {

    }

    function findAllFormsForUser(userId) {

    }

    function createForm(newForm) {

    }

    function updateForm(formId, formObj) {

    }

    function deleteForm(formId) {

    }
}
