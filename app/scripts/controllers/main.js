'use strict';

var app = angular.module('frontendApp');

app.directive('flash', function() {
  return {
      restrict: 'AE',
      scope: {
      	message:'='
      },
      templateUrl: 'views/flash.html'
  };
});

app.factory('Blogs', function($http){
    var URL = 'http://ng-project-backend.herokuapp.com/api/blogs.json'; 
    var blogsService = {};
    
    blogsService.all = function(){
    	return $http.get(URL)	
    } 

    blogsService.create = function(data){
    	console.log("called")
    	return $http.post(URL, data)	
    } 

    return blogsService;
 
});

app.controller('MainCtrl', function ($scope, Blogs) {
	$scope.formVisible = false;

    Blogs.all().success( function(data, status, headers, config) {
    	$scope.entries = data;
    }); 

    $scope.createBlog = function() {
    	//Blogs.create($scope.blog).success(function(data, status, headers, config) {
    	//	$scope.entries.push(data);
    	//});
        $scope.flash = "A new blog entry '"+$scope.blog.subject+"'' created"
    	$scope.formVisible = false;
    	$scope.blog = {}
    }

});