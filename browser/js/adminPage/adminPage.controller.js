app.controller('AdminCtrl', function ($scope, $http, SingleProductFactory, $state) {
	$scope.tabs = [{
		title: 'Add Product',
		url: 'addProduct'
	}, {
			title: 'Edit Users',
			url: 'editUsers'
		}];

	$scope.currentTab = 'addProduct';

	$scope.onClickTab = function (tab) {
		$scope.currentTab = tab.url;
	}

	$scope.isActiveTab = function (tabUrl) {
		return tabUrl == $scope.currentTab;
	}

	$scope.getUsers = function () {
		console.log($scope.members)
	}

	$scope.getUsers = function () {
		console.log(users)
	}

	$scope.createProduct = function () {
		console.log($scope);

        var productObj = {
            name: $scope.product.name,
            category: $scope.product.category,
            pictureURL: $scope.product.pictureURL,
            price: +$scope.product.price,
            description: $scope.product.description,
            rarity: +$scope.product.rarity,
            location: $scope.product.location,
            stocks: +$scope.product.quantity
        }

        SingleProductFactory.createProduct(productObj)
			.then(function (productCreated) {
				console.log(productCreated);
				$state.go('catalog');
			})
			.catch(console.error.bind(console));
    }

})