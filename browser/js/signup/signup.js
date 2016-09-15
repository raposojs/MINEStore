'use strict'

app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

