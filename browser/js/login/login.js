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

    $scope.notifyGood = function(user){
        Notification.info('Welcome back, ' + user + '!') 
    }

    $scope.notifyBad = function(user){
        Notification.error('Someone has already signup with this e-mail') 
    }

    $scope.new = function(user){
        Notification(user + ', your account has been successfully created! Welcome to MINE!') 
    }

    $scope.login = {};
    $scope.error = null;

    $scope.loginUser = function () {
        $scope.error = null;
        AuthService.login($scope.login).then(function (userInfo) {
            $state.go('home');
            $scope.notifyGood(userInfo.username)
            // console.log(a)
            
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });
    };


    // == SIGN UP CONTROLS == //
    $scope.createUser = function(){
        console.log("nega")
        return SignInFactory.checkEmail($scope.register.email)
            .then(function(check){
                if(check === false) {
                    console.log("OJDAOSJASOJ")
                    $scope.takenEmail = true;
                    return;

                } else {
                    // $scope.notifyBad()
                    $scope.new("OK")
                    return SignInFactory.createUser($scope.register)
                        .then(function(createdUser){

                            console.log("YAY1")
                           return AuthService.login({email: $scope.register.email, password: $scope.register.password}).then(function () {
                                console.log("YAY2")
                                $state.go('home');
                            }).catch(function () {
                                $scope.error = 'Invalid login credentials.';
                            });     
                        })

                    
                }
            })
            console.log("NEGA")
    }


});