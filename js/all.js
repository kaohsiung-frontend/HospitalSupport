var app = angular.module('app', [])
app.controller('MainController',function ($log, $http, $scope) {
    $scope.type = 'blood';

   	$http.get('json/blood.json')
   	.success(function(data) {
      	$scope.bloodList = data;
      	console.log('success'+ data);
    })
    .error(function (data) {
    	console.log('error' + data);
    });

    // blood Status
    $http.get('http://g0v.github.io/blood/blood.json')
   	.success(function(data) {
      	$scope.bloodStatus = data;
      	console.log('success bloodStatus'+ data);
    })
    .error(function (data) {
    	console.log('error' + data);
    });

    
});

app.filter('bloodString', function(){
	return function(str){
		if(str == 'full'){
			return '正常';
		}
		else if(str == 'medium'){
			return '偏低';	
		}
		else if(str == 'empty'){
			return '極缺';	
		}

		
	};
		
});