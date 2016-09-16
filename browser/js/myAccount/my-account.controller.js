app.controller('TabsCtrl', function($scope){
	$scope.tabs = [{
	        title: 'About You',
	        url: 'one.tpl.html'
	    }, {
	        title: 'Past Orders',
	        url: 'two.tpl.html'
	    }, {
	        title: 'Settings',
	        url: 'three.tpl.html'
	}];

	$scope.currentTab = 'one.tpl.html';

	$scope.onClickTab = function (tab) {
	    $scope.currentTab = tab.url;
	}
	
	$scope.isActiveTab = function(tabUrl) {
	    return tabUrl == $scope.currentTab;
	}
})