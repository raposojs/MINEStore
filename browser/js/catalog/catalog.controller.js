'use strict';

app.controller('CatalogCtrl', function($scope, $http, $state, CartFactory, CatalogFactory){

	// JOE: Consider putting this in a resolve for the catalog state.
	CatalogFactory.getAll()
	.then(function(products){
		$scope.products = products;
		$scope.all = angular.copy($scope.products, []);
		// $scope.rarity = $scope.products.rarity
			
	});
	$scope.categories = ['All', 'Mineral', 'Meteorite', 'Rock'];
	$scope.sortBy = ['name', 'price', 'rarity', 'stocks'];
	
	$scope.detail = function(product){
		$state.go('singleproduct', {productID: product.id});
	}

	// JOE: This can effectively be done with an HTML filter
	// in conjunction with a ng-repeat.
	// http://fdietz.github.io/recipes-with-angular-js/common-user-interface-patterns/filtering-and-sorting-a-list.html
	$scope.filter = function(cat){
		$scope.products = angular.copy($scope.all, []);
		if (cat === 'All'){
			return;
		}
		$scope.products = $scope.products.filter(function(product){
			return product.category === cat;
		})
	}

	$scope.addToCart = function(product){
		CartFactory.addItemToCart(product.id, product.price)
		.then(function(cart){
			$state.go('cart')
			return cart;
		}).catch(console.error.bind(console));
	}
})

