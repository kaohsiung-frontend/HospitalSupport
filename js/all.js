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

    $http.get('http:////tonyq.org/kptaipei/api-20150628.php')
        .success(function(data){
            $scope.peopleList = data;
        })
        .error(function(err){
            console.log('error' + data);
        });
});