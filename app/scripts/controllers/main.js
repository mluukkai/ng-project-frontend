'use strict';

var app = angular.module('frontendApp');

app.factory('loginInterceptor', function($q, $rootScope) {
    return {
     'responseError': function(response) {
        if (response.status==401) {
          $rootScope.modal.visible = true
        }

        return $q.reject(response);
      }
    };
  });

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('loginInterceptor')
});

app.directive('modal', function() {
  return {
    restrict: 'E',
    controller: function($scope, Auth){
      $scope.hideModal = function() {
        scope.modal.visible = false;
      };
      $scope.login = function(){
        Auth.login($scope.credentials)
        $scope.modal.visible = false;
      }
    },
    templateUrl: 'views/modal.html',
  };
});

app.directive('flash', function() {
  return {
      restrict: 'AE',
      replace: true,
      scope: {
      	message:'='
      },
      templateUrl: 'views/flash.html',
      link: function(scope, elem, attrs) {
      	if ( attrs['type']!=undefined) {
      		elem.addClass('alert-'+attrs['type'])
      	} else {
      		elem.addClass('alert-success')
      	}	
      }
  };
});

app.factory('Auth', function($http){
    var URL = 'http://ng-project-backend.herokuapp.com/session'; 
    var service = {};

    service.logged = {}; 

    service.login = function(credentials) {
      return $http.post(URL, credentials).then(
        function (token) {
          service.logged.status = true;
          service.logged.user = credentials.user;
          $http.defaults.headers.common['auth-token'] = token.data;
          return token.data;
        }
      )  
    } 

    service.logout = function(credentials) {
      return $http.delete(URL).then(
        function () {
          service.logged.status = false;
          service.logged.user = null;
          delete $http.defaults.headers.common['auth-token']
          return null;
        }
      )
    } 

    return service;
});

app.factory('Blogs', function($http){
    var URL_BASE = 'http://ng-project-backend.herokuapp.com/api/blogs'; 

    var blogsService = {};
    
    blogsService.all = function(){
    	return $http.get(URL_BASE+".json")	
    } 

    blogsService.create = function(data){
    	console.log("called")
    	return $http.post(URL_BASE+".json", data)	
    } 

    blogsService.delete = function(data){
      return $http.delete(URL_BASE+"/"+data.id+".json", data) 
    } 

    return blogsService;
});

app.controller('MainCtrl', function ($rootScope, $scope, $http, Blogs, Auth) {
    $scope.formVisible = false;
    $scope.loggedIn = Auth.logged;

    Blogs.all().success( function(data, status, headers, config) {
    	$scope.entries = data;
    }); 

    $rootScope.modal = {}
    $rootScope.modal.visible = false;

    $scope.deleteBlog = function(entry) { 
      Blogs.delete(entry).success(function(){
        var index = $scope.entries.indexOf(entry)
        $scope.entries.splice(index, 1);
      }).error(function(){
      });
    }

    $scope.logout = function() {
      Auth.logout()
    }

    $scope.login = function(){
      Auth.login($scope.credentials)
      .then( 
        function(data) {
          // success
        },function( data ) {
          // failure
        }
      );
      $scope.credentials = {}
    }

    $scope.createBlog = function() {
    	Blogs.create($scope.blog).success(function(data, status, headers, config) {
    		console.log('luoto')
        $scope.entries.push(data);
    	});
      $scope.flash = "A new blog entry '"+$scope.blog.subject+"'' created"
    	$scope.formVisible = false;
    	$scope.blog = {}
    }

});

