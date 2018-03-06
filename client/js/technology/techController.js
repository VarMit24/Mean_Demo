app.controller('techController',['$scope','$http','TechService',function($scope,$http,TechService){
	// body...
	
	$scope.techs=[];
	
	TechService.getTech(function(response){
			if(response.success == true){
				$scope.techs=response.result;
			}
			
		});	

	$scope.addTech = function(techName){
		if(techName != '' && techName != undefined){
			/*var obj = {	name:$scope.techName};
			$scope.techs.push(obj)	
			$scope.techName=''*/
			TechService.addTech(techName,function(response){
				if(response.success == true){
					alert("Added successfully")
					$scope.techs.push(response.result);	
					$scope.techName='';
				}
			})
		}
		
	}
}])
