"use strict";var app=angular.module("frontendApp",[]);app.config(["$httpProvider",function(a){a.defaults.useXDomain=!0,delete a.defaults.headers.common["X-Requested-With"]}]);var app=angular.module("frontendApp");app.factory("loginInterceptor",["$q","$rootScope",function(a,b){return{responseError:function(c){return 401==c.status&&(b.modal.visible=!0),a.reject(c)}}}]),app.config(["$httpProvider",function(a){a.interceptors.push("loginInterceptor")}]),app.directive("modal",function(){return{restrict:"E",controller:["$scope","Auth",function(a,b){a.hideModal=function(){scope.modal.visible=!1},a.login=function(){b.login(a.credentials),a.modal.visible=!1}}],templateUrl:"views/modal.html"}}),app.directive("flash",function(){return{restrict:"AE",replace:!0,scope:{message:"="},templateUrl:"views/flash.html",link:function(a,b,c){b.addClass(void 0!=c.type?"alert-"+c.type:"alert-success")}}}),app.factory("Auth",["$http",function(a){var b="http://ng-project-backend.herokuapp.com/session",c={};return c.logged={},c.login=function(d){return a.post(b,d).then(function(b){return c.logged.status=!0,c.logged.user=d.user,a.defaults.headers.common["auth-token"]=b.data,b.data})},c.logout=function(){return a.delete(b).then(function(){return c.logged.status=!1,c.logged.user=null,delete a.defaults.headers.common["auth-token"],null})},c}]),app.factory("Blogs",["$http",function(a){var b="http://ng-project-backend.herokuapp.com/api/blogs",c={};return c.all=function(){return a.get(b+".json")},c.create=function(c){return console.log("called"),a.post(b+".json",c)},c.delete=function(c){return a.delete(b+"/"+c.id+".json",c)},c}]),app.controller("MainCtrl",["$rootScope","$scope","$http","Blogs","Auth",function(a,b,c,d,e){b.formVisible=!1,b.loggedIn=e.logged,d.all().success(function(a){b.entries=a}),a.modal={},a.modal.visible=!1,b.deleteBlog=function(a){d.delete(a).success(function(){var c=b.entries.indexOf(a);b.entries.splice(c,1)}).error(function(){})},b.logout=function(){e.logout()},b.login=function(){e.login(b.credentials).then(function(){},function(){}),b.credentials={}},b.createBlog=function(){d.create(b.blog).success(function(a){console.log("luoto"),b.entries.push(a)}),b.flash="A new blog entry '"+b.blog.subject+"'' created",b.formVisible=!1,b.blog={}}}]);