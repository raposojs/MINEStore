app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/my-account/admin',
        templateUrl: 'js/adminPage/adminPage.html',
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });

});
