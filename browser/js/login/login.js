app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, $http) {

    $scope.login = {};
    $scope.error = null;

    $scope.loginUser = function () {

        $scope.error = null;
        console.log('SCOPE LOGIN', $scope.login);
        AuthService.login($scope.login).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

// == SIGN UP CONTROLS == //

    $scope.createUser = function(){
        //ajax request to creat a user
        //TODO: move this to Factory
        $http.post('/api/members/', $scope.register)
            .then(function(createdUser){
                console.log('a user has been created', createdUser);

                AuthService.login({email: $scope.register.email, password: $scope.register.password}).then(function () {
                    $state.go('home');
                }).catch(function () {
                    $scope.error = 'Invalid login credentials.';
                });
            });

    }


});