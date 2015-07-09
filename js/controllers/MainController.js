app.controller('MainController',['$scope', 'blood', 'people', 'bloodStatus',
 function ($scope, blood, people, bloodStatus) {
    $scope.type = 'blood';
   	
    blood
       	.success(function(data) {
          	$scope.bloodList = data;
        })
        .error(function (err) {
        	console.log('blood-error:' + err);
        });

    people
        .success(function(data){
            $scope.peopleList = data;
        })
        .error(function(err){
            console.log('people-error:' + err);
        });

    bloodStatus
        .success(function(data){
            $scope.bloodStatus = data;
        })
        .error(function(err){
            console.log('people-error:' + err);
        });

}]);