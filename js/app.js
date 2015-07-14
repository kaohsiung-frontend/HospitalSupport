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

// filter for people search

app.filter('peopleSearch', ['$filter', function($filter){
	return function(data, text){
		if (!text) return [];

		data = data.filter(function(item){
			return item["姓名"].search(text) > -1
				|| item["收治單位"].search(text) > -1
				|| item["醫療檢傷"].search(text) > -1
				|| item["救護檢傷"].search(text) > -1;
		})

		return data;
	}
}]);