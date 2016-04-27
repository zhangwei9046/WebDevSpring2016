/**
 * Created by ying on 4/20/16.
 */
(function() {
    angular
        .module("ReviewApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {
        var model = this;
        model.user = $rootScope.user;

        model.update = update;

        function update() {
            var userId = $rootScope.user._id;
            var userObj = model.user;
            //console.log(userId);
            UserService.updateUser(userId, userObj)
                .then(function (user) {
                    $rootScope.user = user;
                    model.message = "You successfully updated your profile!";
                });
        }
    }
})();