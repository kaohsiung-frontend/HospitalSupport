angular
.module('app', [])
.controller('MainController',function ($log, $http, $scope) {
    $scope.type = 'blood';
   	$http.get('json/blood.json')
   	.success(function(data) {
      	$scope.bloodList = data;
      	console.log('success'+ data);
    })
    .error(function (data) {
    	console.log('error' + data);
    });
});