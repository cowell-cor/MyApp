'use strict';

// Declare app level module which depends on views, and components
angular.module('meriApp', [
  'ngRoute',
  'meriApp.brLeftNav',
  'meriApp.brRightNav',
  'meriApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
