app.controller('SignupCtrl', function($scope, AuthFactory){
	$scope.signup = AuthFactory.signup;
});