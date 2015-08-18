var ListApp = angular.module('list', ["ngResource", "ngRoute"])

ListApp.config(function($routeProvider){
	$routeProvider
		.when('/login', {
				templateUrl	: '/template/login',
				controller  : 'loginController'
		})
		.when('/', {
				templateUrl	: '/template/home',
				controller  : 'homeController'
		})
		.when('/user', {
				templateUrl	: '/template/user',
				controller  : 'userController'
		})
		.when('/list', {
				templateUrl : '/template/list',
				controller 	: 'listController'
		})
})

ListApp.controller('loginController', ['$scope', '$http', '$location', function($scope, $http, $location){
	$scope.userLogin = function(){
		console.log('login!', $scope.loginUser)
		$http.post('/auth/login', $scope.loginUser).then(function(returnData){
			// $scope.loginUser = {}
			console.log(returnData)
			$location.url('/user');
		})
	}
	$scope.userSignup = function(){
		console.log('signup!', $scope.signupUser)
		$http.post('/auth/signup', $scope.signupUser).then(function(returnData){
			console.log(returnData)
		})
	}		
}])

ListApp.controller('listController', ['$scope', function($scope){
	$scope.listItems = [
		{
			'itemName' : 'Blueberries',
			'claimed' : false
		}
	]

	$scope.addItem = function(){
		$scope.listItems.push({
			'itemName': $scope.newListItem, 
			'claimed': false
		})
		//console.log('!', $scope.newListItem)
		$scope.newListItem = ''
	}

	$scope.clearClaimed = function(){
		$scope.listItems = $scope.listItems.filter(function(item){
			if(!item.claimed){
				return item
			}
		})
		// console.log('fileredItems ', $scope.listItems)
		// console.log('fileredItems ', $scope.clearClaimed)
	}
}]);

ListApp.controller('userController', ['$scope', function($scope){
	$scope.listItems = [
		{
			'' : '',
			'' : false
		}
	]


}]);

ListApp.controller('homeController', ['$scope', '$http', '$location', function($scope, $http, $location){
	$http.get('/api/me').then(function(returnData){
		console.log(returnData);
		if (!returnData.data){
			$location.url('/login');
		}
		else {
			$scope.user = returnData.data;
		}
	})
	


}]);
	// Tuesday to do:
// see data model whiteboard photo 
// set up dynamic routing
// persist user list to db
// create person object to array of items for that person (each item can be associated to a store)
// user logs in, oAuth for fbConnect, gmail, etc.
// after login, screen needs to show 2 lists:
// 1. their items (dropdown to see only items by store- at currently)
// 2. and present a list of the people who have items requested at that store
/// from the list of people, select to show their list of items	
// function to create shopping list based on route for store optimized by shortest.