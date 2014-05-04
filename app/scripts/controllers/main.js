'use strict';

var app = angular.module('frontendApp')
  
app.controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $http.get('http://localhost:3000/api/blogs.json').success( function(data, status, headers, config) {
    	console.log(data)
    });
});
