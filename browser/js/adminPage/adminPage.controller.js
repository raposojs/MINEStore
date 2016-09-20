app.controller('AdminCtrl', function ($scope, $http, SingleProductFactory, $state, users,orders, AdminFactory) {
	$scope.tabs = [{
		title: 'Add Product',
		url: 'addProduct'
	}, {
			title: 'Edit Users',
			url: 'editUsers'
		}, {
			title: 'Order Info',
			url: 'adminOrders'
		}];

	$scope.currentTab = 'addProduct';
	$scope.product = {};

	$scope.onClickTab = function (tab) {
		$scope.currentTab = tab.url;
	}

	$scope.isActiveTab = function (tabUrl) {
		return tabUrl == $scope.currentTab;
	}

	$scope.createProduct = function () {
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
				$state.go('catalog');
			})
			.catch(console.error.bind(console));
    }

    // $scope.text = "user"
    $scope.selectedUser = null;
    $scope.error = null;

    $scope.findUser = function () {
		if (!this.text) {
			$scope.selectedUser = null;
			$scope.error = null;
			return;
		}

		$scope.selectedUser = null;
		$scope.error = null;
		for (var i = 0; i < users.data.length; i++) {
			if (this.text === users.data[i].username) {
				$scope.error = null;
				$scope.selectedUser = users.data[i]
				$scope.display = this.text
			}
		}
		if (!$scope.selectedUser) {
			$scope.error = "Username " + '"' + this.text + '"' + " does not exist"
		}
	};

	$scope.deleteUser = AdminFactory.deleteUser;
	$scope.saveUser = AdminFactory.saveUser;
	$scope.resetPassword = function(user){
		user.password = "123456";
		AdminFactory.saveUser(user)
		.then(function(user){
		}).catch(console.error.bind(console));
	}


	    // orders admin page
	    $scope.orders = orders;


})