var app = angular.module('app', []);

// 自訂過濾條件 for blood Status
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

app.filter('StatusOnly', function(){
	return function(str){
		if(str != 'time'){
			console.log(str);
			return str;
		}
	};
});