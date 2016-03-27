/**
 * Created by ying on 2/20/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", fieldController);

    function fieldController (FieldService, FormService, $routeParams, $rootScope) {
        var model = this;
        var userId = $routeParams.userId;
        var formId = $routeParams.formId;
        model.addField = addField;
        model.removeField = removeField;

        FormService.findFormById(formId)
            .then(foundFormById);

        function foundFormById (response) {
            model.form = response;
        }

        initFields();

        function initFields () {
            FieldService.getFieldsForForm(formId)
                .then(initiateGetFieldsForForm);
            function initiateGetFieldsForForm (response) {
                console.log(response);
                model.fields = response.fields;
            }
        }

        function removeField (fieldIndex) {
            FieldService.deleteFieldFromForm(formId, fieldIndex)
                .then(initiateDelete);
            function initiateDelete (response) {
                initFields();
            }
        }

        function addField (fieldType) {
            var newField;

            switch (fieldType) {
                case "Single Line Text" :
                    newField = {
                        "label" : "New Text Field",
                        "fieldType" : "TEXT",
                        "placeholder" : "New Field"
                    };
                    break;
                case "Date" :
                    newField = {
                        "label" : "New Date Field",
                        "fieldType" : "DATE"
                    };
                    break;
                case "Dropdown" :
                    newField = {
                        "label" : "New Dropdown",
                        "fieldType" : "OPTIONS",
                        "options" : [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };
                    break;
                case "Checkboxes" :
                    newField = {
                        "label" : "New Checkboxes",
                        "fieldType" : "CHECKBOXES",
                        "options" : [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    };
                    break;
                case "Radio buttons" :
                    newField = {
                        "label": "New Radio Buttons",
                        "fieldType": "RADIOS",
                        "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    };
                    break;
                case "Multi Line Text" :
                    newField = {
                        "label" : "New Text Field",
                        "fieldType" : "TEXTAREA",
                        "placeholder" : "New Field"
                    };
            }

            FieldService.createNewFieldForForm (formId, newField)
                .then(function(){
                    initFields();
                });
        }
    }
}) ();