app.config(function ($stateProvider) {

    $stateProvider.state('myAccount', {
        url: '/my-account',
        templateUrl: 'js/myAccount/my-account.html',
        controller: 'TabsCtrl',
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });

});
