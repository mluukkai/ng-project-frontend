'use strict';

var app = angular.module('frontendApp');

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

app.controller('MainCtrl', function ($scope, $http, Blogs) {

    Blogs.all().success( function(data, status, headers, config) {
    	$scope.entries = data;
    }); 

    $scope.createBlog = function() {
    	console.log("called")
    	$scope.blog = {}
    }

});