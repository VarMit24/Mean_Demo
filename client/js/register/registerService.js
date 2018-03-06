app.factory('RegisterService',['$http',function($http){
	var service={};

	service.register = register;
	service.checkUser = checkUser;
	service.checkEmail = checkEmail;

	return service;

	function register(user,callback){
		$http.post('/app/register',{name:user.userName,email:user.userEmail,password:user.userPassword,admin:true}).success(function(response){
			callback(response);
		})
	}

	function checkUser(name,callback){
		$http.get('/app/checkUser', {params:{name:name}}).success(function(response){
			callback(response);
		})
	}

	function checkEmail(email,callback){
		$http.get('/app/checkEmail', {params:{email:email}}).success(function(response){
			callback(response);
		})
	}
}]);