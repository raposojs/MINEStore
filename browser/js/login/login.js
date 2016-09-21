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
        return $http.post('/api/members/checkEmail', {email: email})
            .then(function(checked){
            return checked;
            
        })
    };

    sf.createUser = function(register){
        //ajax request to creat a user
        return $http.post('/api/members/', register)
            .then(function(createdUser){
                //console.log('a user has been created', createdUser); 
            })
    }

    return sf;
})


app.controller('LoginCtrl', function ($scope, $state, AuthService, SignInFactory, Notification) {

    $scope.notify = function(user){
        Notification.info('Welcome back, ' + user + '!') 
    }
    $scope.login = {};
    $scope.error = null;

    $scope.loginUser = function () {
        $scope.error = null;
        AuthService.login($scope.login).then(function (userInfo) {
            $state.go('home');
            $scope.notify(userInfo.username)
            // console.log(a)
            
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });
    };


    // == SIGN UP CONTROLS == //
    $scope.createUser = function(){
        console.log($scope.register.email);
        return SignInFactory.checkEmail($scope.register.email)
            .then(function(check){
                if(check === false) {
                    $scope.takenEmail = true;
                    return;

                } else {
                    return SignInFactory.createUser($scope.register)
                        .then(function(createdUser){
                           return AuthService.login({email: $scope.register.email, password: $scope.register.password}).then(function () {
                                $state.go('home');
                            }).catch(function () {
                                $scope.error = 'Invalid login credentials.';
                            });     
                        })

                    
                }
            })
    }


});