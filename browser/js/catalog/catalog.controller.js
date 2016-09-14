'use strict';

app.controller('CatalogCtrl', function($scope, $http){
	
	$http.get('/api/products')
		.then(function(products){
			$scope.products = products.data;
	});

})