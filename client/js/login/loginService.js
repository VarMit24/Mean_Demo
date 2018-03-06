app.factory('AuthService',['$http','$localStorage',function($http,$localStorage){
	var service={};

	service.logout = logout;
	service.login = login;

	return service;

	function logout(){
		delete $localStorage.currentUser;
		$http.defaults.headers.common.Authorization = '';
	}

	function login(user,callback){
		$http.post('/api/authenticate',{name:user.userName,password:user.userPassword}).success(function(response){
			if(response.success == true){
				$localStorage.currentUser = { username: user.userName, token: response.token };
				$http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
				callback(response.success);
			}
			else{
				callback(response);
			}
		})
	}

}]);