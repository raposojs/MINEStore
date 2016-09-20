app.controller('TabsCtrl', function($scope, CartFactory, $state, AuthService, adminstatus){
	$scope.tabs = [{
	        title: 'Past Orders',
	        url: 'pastOrders'
	    }, {
	        title: 'Settings',
	        url: 'settings'
		}];

	$scope.isAdm = adminstatus.isAdmin;

	$scope.currentTab = 'pastOrders';

	$scope.onClickTab = function (tab) {
	    $scope.currentTab = tab.url;
	}
	
	$scope.isActiveTab = function(tabUrl) {
	    return tabUrl == $scope.currentTab;
	}

	CartFactory.pastOrders()
	.then(function(pastOrders){
		$scope.pastOrders = pastOrders.data
	}).catch(console.error.bind(console));

	$scope.getCartById = function(id){
		CartFactory.getCartById(id)
		.then(function(cart){
			console.log('cart', cart);
			/*cart data structure
			Cart level is essentially the order model, but it has a property products
			which houses all the products.

			Inside each products, there is an object/property OrderedProduct that houses the
			quantity of each object. 

			Hope this helps, format however!

			- Ten
			*/
			for(var i =0 ; i < $scope.pastOrders.length ; i++){
				if($scope.pastOrders[i].id === id){
					$scope.pastOrders[i].details = cart;
					console.log('index i', $scope.pastOrders[i].details);
					break;
				}
			}
			$scope.thisCart = cart;
		}).catch(console.error.bind(console));
	}

	$scope.setUser = function () {
	    AuthService.getLoggedInUser().then(function (user) {
	        // return user
	        console.log(user)
	    });
	};


})