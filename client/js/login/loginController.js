app.controller('loginController',['$scope','$state','AuthService',function($scope,$state,AuthService){
	// body...
	//first logout the current user if logged in
	init();

	function init(){
		AuthService.logout();
	}

	$scope.login = function(user){
		AuthService.login(user, function(response){
			if(response == true){
				$state.go('technology')
			}
		})
		
				
	}
	$scope.openRegister = function(){
		$state.go('register');
	}
	
}])
