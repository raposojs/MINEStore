app.controller('AdminCtrl', function ($scope, $http, SingleProductFactory, $state, users, products, orders, AdminFactory) {
	$scope.tabs = [{
		title: 'Add Product',
		url: 'addProduct'
	},{
		title: 'Edit Product',
		url: "editProduct"
	},{
		title: 'Edit Users',
		url: 'editUsers'
	},{
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

	$scope.currentProduct=null;
	$scope.editProduct=function(id, updates){
		AdminFactory.editProduct(id, updates)
		.then(function(){
			$scope.message="Product Successfully updated."
		})
	}
	$scope.findProduct=function(){
		$scope.currentProduct=null;
		$scope.message=null;
		$scope.error=null;
		console.log("hello");
		if (!this.productText){
			return
		}
		for (var i=0; i<products.length; i++){
			if (this.productText===products[i].name){
				$scope.currentProduct=products[i];
				$scope.display=this.productText;
			}
		}
		if (!$scope.currentProduct){
			$scope.error="The product you entered does not exist.";
		}
		console.log($scope.currentProduct);
	};

	$scope.deleteUser = function(userId){
		AdminFactory.deleteUser(userId)
		.then(function(success){
			$scope.selectedUser = null;
			users.data = users.data.map(function(user){
				return user.id !== userId;
			})
		})
		.catch(console.error.bind(console))
	}

	$scope.saveUser = AdminFactory.saveUser;
	$scope.resetPassword = function(user){
		user.password = "123456";
		AdminFactory.saveUser(user)
		.then(function(savedUser){
			console.log('USER IS', savedUser);
		}).catch(console.error.bind(console));
	}

	    // orders admin page
	    $scope.orders = orders.data.map(function(order){
			var orderAddress = JSON.parse(order.address);
			if(orderAddress) order.address = orderAddress.name + ' ' + orderAddress.address + ' ' + orderAddress.extension + ', ' + orderAddress.cityState + ' ' + orderAddress.zip;
			return order;
		})

		$scope.orders = $scope.orders.filter(function(order){
			return order.isCart === false;
		})


})