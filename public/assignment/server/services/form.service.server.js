/**
 * Created by ying on 3/15/16.
 */
module.exports = function (app, model, db) {
    app.get("/api/assignment/form/:formId", findFormById);
    //app.get("api/assignment/form/:title", findFormByTitle);
    app.get("/api/assignment/form", findAllForms);
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.post("/api/assignment/user/form", createForm);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId", deleteForm);

    function findFormById(req, res) {
        var formId = req.param.formId;
        model.findFormById(formId)
            .then(function (form) {
                res.json(form);
            })
    }

    //function findFormByTitle(req, res) {
    //    var title = req.param.title;
    //
    //}

    function findAllForms(req, res) {
        model
            .findAllForms()
            .then(function (forms) {
                res.json(forms);
            })
    }

    function findAllFormsForUser(req, res) {
        var userId = req.param.userId;
        model
            .findAllFormsForUser(userId)
            .then(function (forms) {
                res.json(forms);
            })
    }

    function createForm(req, res) {
        var form = req.body;
        model
            .createForm(form)
            .then(function (forms) {
                res.json(forms);
            })
    }

    function updateForm(req, res) {
        var formId = req.param.formId;
        var formObj = req.body;
        model
            .updateForm(formId, formObj)
            .then(function (form) {
                res.json(form);
            })
    }

    function deleteForm(req, res) {
        var formId = req.param.formId;
        model
            .delefeForm(formId)
            .then(function (forms) {
                res.json(forms);
            })
    }
}