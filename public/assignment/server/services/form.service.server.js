/**
 * Created by ying on 3/15/16.
 */
module.exports = function(app, model, db) {
    app.get("api/assignment/form:formId", findFormById);
    app.get("api/assignment/form:title", findFormByTitle);
    app.get("api/assignment/form", findAllForms);
    app.get("api/assignment/user/:userId/form", findAllFormsForUser);
    app.post("api/assignment/user/form", createForm);
    app.put("api/assignment/form/:formId", updateForm);
    app.delete("api/assignment/form/:formId", deleteForm);

    function findFormById(req, res) {

    }

    function findFormByTitle(req, res) {

    }

    function findAllForms(req, res) {

    }

    function findAllFormsForUser(req, res) {

    }

    function createForm(req, res) {

    }

    function updateForm(req, res) {

    }

    function deleteForm(req, res) {

    }
}