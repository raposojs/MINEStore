app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});


app.factory('SignInFactory', function($http){
    var sf = {};

    sf.checkEmail = function(email){
        return $http.get('/api/members/checkEmail', {email: email})
            .then(function(checked){
            if(checked === null) return true;
            else return false;
        })
    };

    sf.createUser = function(register){
        //ajax request to creat a user
        $http.post('/api/members/', register)
            .then(function(createdUser){
                console.log('a user has been created', createdUser); 
            })
    }

    return sf;
})

app.controller('LoginCtrl', function ($scope, AuthService, $state, $http, SignInFactory) {

    $scope.login = {};
    $scope.error = null;

    $scope.loginUser = function () {
        $scope.error = null;
        AuthService.login($scope.login).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });
    };


    // == SIGN UP CONTROLS == //
    $scope.createUser = function(){
        SignInFactory.checkEmail({email: $scope.register.email})
            .then(function(check){
                if(check === false) {
                    $scope.takenEmail = true;
                } else {
                    SignInFactory.createUser($scope.register);

                    AuthService.login({email: $scope.register.email, password: $scope.register.password}).then(function () {
                        $state.go('home');
                    }).catch(function () {
                        $scope.error = 'Invalid login credentials.';
                    });
                }
            })
    }


});