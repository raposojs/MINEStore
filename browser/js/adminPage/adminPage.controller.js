app.controller('AdminCtrl', function($scope, $http, users){
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
	
	$scope.isActiveTab = function(tabUrl) {
	    return tabUrl == $scope.currentTab;
	}

	$scope.getUsers = function(){
		console.log($scope.members)
	}

	$scope.getUsers = function(){
		console.log(users)
	}

})