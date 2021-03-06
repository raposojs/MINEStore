app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, Notification) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Home', state: 'home' },
                // { label: 'About', state: 'about' },
                { label: 'Catalog', state: 'catalog' },
                // { label: 'Documentation', state: 'docs' },
                { label: 'My Account', state: 'myAccount', auth: true },
                { label: 'Cart', state: 'cart'},
            ];

            scope.user = null;

            var bye = function(user){
                Notification.error("Bye, " + user + "!")
            }

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function (user) {
                AuthService.logout().then(function () {
                   bye(user)
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
