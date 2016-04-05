/**
 * Created by ying on 2/20/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", fieldController);

    function fieldController(FieldService, FormService, $routeParams, $rootScope) {
        var model = this;
        var formId = $routeParams.formId;

        model.addField = addField;
        model.editField = editField;
        model.updateField = updateField;
        model.cloneField = cloneField;
        model.removeField = removeField;

        FormService.findFormById(formId)
            .then(function (response) {
                model.form = response;
            })

        initFields();

        function initFields() {
            if ($rootScope.user) {
                FieldService.getFieldsForForm(formId)
                    .then(function (response) {
                        console.log(response);
                        model.fields = response;
                    });
            }
        }

        function editField(curField) {
            //console.log(curField);
            model.field = curField;
            var options = [];
            if (model.field.type == "OPTIONS" || model.field.type == "CHECKBOXES" || model.field.type == "RADIOS") {
                for (var i in curField.options) {
                    var o = curField.options[i].label + ":" + curField.options[i].value;
                    console.log(o);
                    options.push(o);
                }
            }
            model.field.optionsText = options.join("\n");
            //console.log(model);
            //FieldService.updateFieldForForm(formId, fieldIndex, fieldObj)
            //    .then(function(response) {
            //        initFields();
            //    })
        }

        function updateField(fieldObj) {
            var optionsArray = [];
            if (model.field.type == "OPTIONS" || model.field.type == "CHECKBOXES" || model.field.type == "RADIOS") {
                var text = model.field.optionsText.split("\n");
                for (var i in text) {
                    var a = text[i].split(":");
                    optionsArray.push({
                        label: a[0],
                        value: a[1]
                    })
                }
                fieldObj.options = optionsArray;
            }
            FieldService.updateFieldForForm(formId, fieldObj._id, fieldObj)
                .then(function () {
                    initFields();
                })
        }

        function cloneField(fieldIndex) {
            var newField = {
                label: model.fields[fieldIndex].label,
                type: model.fields[fieldIndex].type,
                placeholder: model.fields[fieldIndex].placeholder,
                options: model.fields[fieldIndex].options
            }
            FieldService.createNewFieldForForm(formId, newField)
                .then(function (response) {
                    initFields();
                });
        }

        function removeField(fieldIndex) {
            FieldService.deleteFieldFromForm(formId, fieldIndex)
                .then(function (response) {
                    initFields();
                });

        }

        function addField(type) {
            if (!type) {
                return;
            }
            var newField;
            switch (type) {
                case "Single Line Text" :
                    newField = {
                        "label": "New Text Field",
                        "type": "TEXT",
                        "placeholder": "New Field"
                    };
                    break;
                case "Date" :
                    newField = {
                        "label": "New Date Field",
                        "type": "DATE"
                    };
                    break;
                case "Dropdown" :
                    newField = {
                        "label": "New Dropdown",
                        "type": "OPTIONS",
                        "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };
                    break;
                case "Checkboxes" :
                    newField = {
                        "label": "New Checkboxes",
                        "type": "CHECKBOXES",
                        "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    };
                    break;
                case "Radio buttons" :
                    newField = {
                        "label": "New Radio Buttons",
                        "type": "RADIOS",
                        "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    };
                    break;
                case "Multi Line Text" :
                    newField = {
                        "label": "New Text Field",
                        "type": "TEXTAREA",
                        "placeholder": "New Field"
                    };
            }

            FieldService.createNewFieldForForm(formId, newField)
                .then(function (response) {
                    initFields();
                });
        }
    }
})();