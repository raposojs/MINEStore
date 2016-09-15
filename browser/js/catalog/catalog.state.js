app.config(function ($stateProvider) {
    $stateProvider.state('catalog', {
        url: '/catalog',
        templateUrl: 'js/catalog/catalog.html',
        controller: 'CatalogCtrl'
    });
});