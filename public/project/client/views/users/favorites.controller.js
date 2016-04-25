/**
 * Created by ying on 4/22/16.
 */
(function() {
    angular
        .module("ReviewApp")
        .controller("FavoritesController", FavoritesController);

    function FavoritesController($rootScope, UserService) {
        var model = this;
        model.getFavorites = getFavorites;
        model.unlike = unlike;

        getFavorites();

        function getFavorites() {
            UserService
                .getAllProductsFromUser($rootScope.user.username)
                .then(
                    function(response) {
                        if (!response.data || response.data.length == 0) {
                            model.err = "You haven't added any favorites yet! Go add some!";
                        } else {

                            model.products = response.data;
                        }

                    },
                    function(err) {
                        model.err = "Err";
                    }
                )
        }

        function unlike(favoritesId) {
            console.log(favoritesId);
            UserService
                .removeFavoritesForUser($rootScope.user.username, favoritesId)
                .then(
                    function(response) {
                        getFavorites();
                    },
                    function(err) {
                        model.err = "Err";
                    }
                )
        }
    }
})();