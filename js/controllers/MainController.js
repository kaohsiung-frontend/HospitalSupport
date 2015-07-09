app.controller('MainController',['$scope', 'blood', 'people', function ($scope, blood, people) {
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
}]);