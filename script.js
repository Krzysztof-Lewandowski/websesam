var app = angular.module('single-page-app', ['ngRoute']);

app.config(function ($routeProvider) {

    $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/login', {
              templateUrl: 'login.html'
            })
            .when('/table', {

              resolve:{
                "check": function($location, $rootScope){
                  if(!$rootScope.loggedIn){$location.path('/');}
                }
              },

              templateUrl: 'table.html'                   

            })
			.otherwise({
					redirectTo: '/'
			});
});

app.controller('cfgController', function ($scope, $http) {
    $scope.message = "Hello world";
	
	var request = {
					method: 'get',
					url: 'response.json',
					dataType: 'json',
					contentType: "application/json"
				};
				
    $scope.arrDocuments = new Array;
    
	$http(request)
                .success(function (jsonData) {
                    $scope.arrDocuments = jsonData;
                    $scope.list = $scope.arrDocuments;
                })
                .error(function () {});


    $scope.propertyName = 'titel';
    $scope.reverse = false;
    
    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
      };      
  	
});

app.controller('loginController', function ($scope, $location, $rootScope) {
	$scope.submit = function() {
		if($scope.username == 'admin' && $scope.password == 'admin') {
      $rootScope.loggedIn = 1;
			$location.path('/table');
    }
    else {alert('Wrong login or password.');}
	};
});

app.run(['$rootScope', '$location', 
   function($rootScope, $location) {
    $rootScope.loggedIn = 0;

     $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
        if(error == 'AUTH_REQUIRED') {
            $rootScope.message = 'Sorry, you must log in to access that page';
            $location.path('/');
        } //AUTH_REQUIRED
     }); // $routeChangeError
   }
]);


/* app.factory('AuthService', function($q) {
  return {
    authenticate: function() {
      // Your authenication logic
      return $q.reject('AUTH_REQUIRED');
    }
  }
});*/