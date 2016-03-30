/*Created by ying on 2/20/16.*/
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);
    function formController($rootScope, FormService, UserService) {
        var model = this;
        model.user = $rootScope.user;

        model.addForm = addForm;
        model.updateForm = updateForm;
        model.deleteForm = deleteForm;
        model.selectForm = selectForm;

        loadAllForms();

        function loadAllForms() {
            FormService.findAllFormsForUser(model.user.id)
                .then(function (forms) {
                    model.forms = forms;
                    //console.log(model.forms);
                })
        }

        function addForm() {
            if (model.formname != null) {
                var formObj = {
                    title: model.formname,
                    userId: model.user.id
                }
                FormService.createFormForUser(formObj)
                    .then(function (forms) {
                        loadAllForms();
                        model.formname = "";
                    })
            }
        }

        var selectedFormIndex = null;

        function updateForm() {
            var newForm = {
                title: model.formname
            }
            if (selectedFormIndex != null) {
                var id = model.forms[selectedFormIndex].id;
                FormService.updateFormById(id, newForm)
                    .then(function (form) {
                        loadAllForms();
                        model.formname = "";
                    })
            }
        }

        function deleteForm($index) {
            FormService.deleteFormById(model.forms[$index].id)
                .then(function (forms) {
                    loadAllForms();
                });
        }

        function selectForm($index) {
            selectedFormIndex = $index;
            model.formname = model.forms[$index].title;
        }
    }
})();