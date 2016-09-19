app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/my-account/admin',
        templateUrl: 'js/adminPage/adminPage.html',
        controller: 'AdminCtrl',
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        },
        resolve: {
        	users: function($http){
        		return $http.get('api/members')
        	}
        }
    });

});


// app.controller('AdminController', function($scope, SingleProductFactory, $state){
//     $scope.checkScope = function(){
//         console.dir($scope);
//     };

//     $scope.createProduct = function(){
//         var productObj = {
//             name: $scope.product.name,
//             category: $scope.product.category,
//             pictureUrl: $scope.product.pictureURL,
//             price: +$scope.product.price,
//             description: $scope.product.description,
//             rarity: +$scope.product.rarity,
//             location: $scope.product.location,
//             stocks: +$scope.product.quantity
//         }

//         SingleProductFactory.createProduct(productObj)
//         .then(function(productCreated){
//             $state.go('catalog');
//         })
//         .catch(console.error.bind(console));
//     }
// })
