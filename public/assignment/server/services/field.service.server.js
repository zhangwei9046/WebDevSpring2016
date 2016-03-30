/**
 * Created by ying on 3/15/16.
 */
module.exports = function (app, model) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdForForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldForForm);

    function findAllFieldsForForm(req, res) {
        var formId = req.params.formId;
        model
            .findAllFieldsForForm(formId)
            .then(function (form) {
                res.json(form);
            })
    }

    function findFieldByFieldIdForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model
            .findFieldByFieldIdForForm(formId, fieldId)
            .then(function (response) {
                res.json(response);
            })
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldObj = req.body;
        model
            .createFieldForForm(formId, fieldObj)
            .then(function (response) {
                res.json(response);
            })
    }

    function updateFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fieldObj = req.body;
        model
            .updateFieldForForm(formId, fieldId, fieldObj)
            .then(function (resopnse) {
                res.json(response);
            })
    }

    function deleteFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        model
            .deleteFieldForForm(formId, fieldId)
            .then(function (response) {
                res.json(response);
            })
    }
}