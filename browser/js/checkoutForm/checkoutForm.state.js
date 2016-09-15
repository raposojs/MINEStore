'use strict'

app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkoutForm/checkoutForm.html',
        controller: 'checkoutCtrl'
    });

});

