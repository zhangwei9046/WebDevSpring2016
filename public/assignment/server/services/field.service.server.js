/**
 * Created by ying on 3/15/16.
 */
module.exports = function (app, model, db) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdForForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldForForm);

    function findAllFieldsForForm(req, res) {

    }

    function findFieldByFieldIdForForm(req, res) {

    }

    function createFieldForForm(req, res) {

    }

    function updateFieldForForm(req, res) {

    }

    function deleteFieldForForm(req, res) {

    }
}