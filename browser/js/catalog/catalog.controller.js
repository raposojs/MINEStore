'use strict';

app.controller('CatalogCtrl', function($scope, $http, $state, CartFactory, CatalogFactory, Notification){
	
	CatalogFactory.getAll()
	.then(function(products){
		$scope.products = products;
		$scope.all = angular.copy($scope.products, []);
	});

	$scope.primaryTitle = function(msg){
		return Notification.success(msg + ' has been added to your cart!')	
	}

	$scope.categories = ['All', 'Mineral', 'Meteorite', 'Rock'];
	$scope.sortBy = ['name', 'price', 'rarity', 'stocks'];
	
	$scope.detail = function(product){
		$state.go('singleproduct', {productID: product.id});
	}

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
			// $state.go('cart')
			return cart;
		}).catch(console.error.bind(console));
	}
})

