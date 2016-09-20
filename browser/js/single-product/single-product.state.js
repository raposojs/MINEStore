'use strict';

app.config(function($stateProvider){

	$stateProvider.state('singleproduct', {
		url: '/singleproduct/:productID',
		templateUrl: 'js/single-product/single-product.template.html',
		controller: 'SingleProductCtrl',
		resolve: {
			loggedUser: function(AuthService){
                return AuthService.getLoggedInUser()
            },
			theProduct: function($http, $stateParams){
				return $http.get('/api/products/' + $stateParams.productID)
					.then(function(created){
						return created.data;
					})
			}
			
		}
	});

	// $stateProvider.state('singleproduct.reviews', {	})

})