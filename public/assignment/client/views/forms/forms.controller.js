/**
 * Created by ying on 2/20/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);
    function formController($scope, $rootScope, FormService) {
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        FormService.findAllFormsForUser($rootScope.user.id)
            .then(function (newForms) {
                $scope.forms = newForms;
                //console.log(newForms);
            });

        function addForm() {
            if ($scope.formName != undefined) {
                var form = {
                    title: $scope.formName,
                    userId: $rootScope.user.id
                }
                FormService.createFormForUser($rootScope.user.id, form)
                    .then(function (newForm) {
                        $scope.formName = undefined;
                    })
                FormService.findAllFormsForUser($rootScope.user.id)
                    .then(function (newForms) {
                        $scope.forms = newForms;
                    })
            }
        }

        var selectedFormIndex = null;

        function updateForm() {
            var newForm = {
                title: $scope.formName
            }
            if (selectedFormIndex != null) {
                var id = $scope.forms[selectedFormIndex].id;
                FormService.updateFormById(id, newForm)
                    .then(function (form) {
                        $scope.formName = undefined;
                    })
            }
            FormService.findAllFormsForUser($rootScope.user.id)
                .then(function (newForms) {
                    $scope.forms = newForms;
                })
        }

        function deleteForm($index) {
            FormService.deleteFormById($scope.forms[$index].id)
                .then(function (forms) {
                });
            FormService.findAllFormsForUser($rootScope.user.id)
                .then(function (newForms) {
                    $scope.forms = newForms;
                })
        }

        function selectForm($index) {
            selectedFormIndex = $index;
            $scope.formName = $scope.forms[$index].title;
        }
    }
})();