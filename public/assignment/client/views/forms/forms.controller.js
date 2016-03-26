/**
 * Created by ying on 2/20/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);
    function formController($scope, $rootScope, FormService) {
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        FormService.findAllFormsForUser($rootScope.user._id, function (newForms) {
            $scope.forms = newForms;
            //console.log(newForms);
        });

        function addForm() {
            if ($scope.formName != undefined) {
                var form = {
                    title: $scope.formName,
                    userId: $rootScope.user._id
                }
                FormService.createFormForUser($rootScope.user._id, form, function (newForm) {
                    $scope.formName = undefined;
                })
                FormService.findAllFormsForUser($rootScope.user._id, function (newForms) {
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
                var id = $scope.forms[selectedFormIndex]._id;
                FormService.updateFormById(id, newForm, function (form) {
                    $scope.formName = undefined;
                })
            }
            FormService.findAllFormsForUser($rootScope.user._id, function (newForms) {
                $scope.forms = newForms;
            })
        }

        function deleteForm($index) {
            FormService.deleteFormById($scope.forms[$index]._id, function (forms) {
            });
            FormService.findAllFormsForUser($rootScope.user._id, function (newForms) {
                $scope.forms = newForms;
            })
        }

        function selectForm($index) {
            selectedFormIndex = $index;
            $scope.formName = $scope.forms[$index].title;
        }
    }
})();