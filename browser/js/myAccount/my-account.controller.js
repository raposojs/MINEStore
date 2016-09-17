app.controller('TabsCtrl', function($scope){
	$scope.tabs = [{
	        title: 'About You',
	        url: 'aboutYou'
	    }, {
	        title: 'Past Orders',
	        url: 'pastOrders'
	    }, {
	        title: 'Settings',
	        url: 'settings'
	}];

	$scope.currentTab = 'aboutYou';

	$scope.onClickTab = function (tab) {
	    $scope.currentTab = tab.url;
	}
	
	$scope.isActiveTab = function(tabUrl) {
	    return tabUrl == $scope.currentTab;
	}
})