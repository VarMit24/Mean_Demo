app.factory('TechService',['$http',function($http){
	var service={};

	service.getTech = getTech;
	service.addTech = addTech;

	return service;

	function getTech(callback){
		$http.get('/api/technology').success(function(response){
			callback(response);
		})	
	}

	function addTech(techName,callback){
		$http.post('/api/add/technology', {name:techName}).success(function(response){
			callback(response);
		})
	}

}]);