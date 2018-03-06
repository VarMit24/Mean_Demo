app.controller('registerController',['$scope','$state','RegisterService',function($scope,$state,RegisterService){
	// body...
	$scope.userNameExist = false;
	$scope.userEmailExist = false;

	$scope.checkUsername = function(name){
		RegisterService.checkUser(name, function(response){
			if(response.success == true){
				$scope.userNameExist = false;
			}
			else{
				$scope.userNameExist = true;
			}
		});
	}

	$scope.checkEmail = function(email){
		RegisterService.checkEmail(email, function(response){
			if(response.success == true){
				$scope.userEmailExist = false;
			}
			else{
				$scope.userEmailExist = true;
			}
		});
	}

	$scope.register = function(user){
		RegisterService.register(user, function(response){
			if(response.success == true){
				$state.go('login')
			}
		});
	}

	$scope.reset = function(){
		$state.reload();
	}
	
}])