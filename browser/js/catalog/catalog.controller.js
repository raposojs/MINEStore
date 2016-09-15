'use strict';

app.controller('CatalogCtrl', function($scope, $http, $state, CartFactory){
	
	$http.get('/api/products')
		.then(function(products){
			$scope.products = products.data;
			// $scope.rarity = $scope.products.rarity
			
	});

	$scope.detail = function(product){
		$state.go('singleproduct', {productID: product.id});
	}

	
})