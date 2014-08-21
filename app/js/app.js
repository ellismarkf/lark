'use strict';

var vulture = angular.module('vulture', [
    'ngRoute',
    'ngSanitize',
    'vultureControllers',
    'vultureServices',
    'vultureFilters',
    'vultureDirectives'
  ]);

vulture.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/search', {
        templateUrl: 'partials/search.html',
        controller: 'searchCtlr'
      }).
      when('/results/:origin', {
        templateUrl: 'partials/results.html',
        controller: 'resultsCtlr'
      }).
      when('/test', {
        templateUrl: 'partials/test.html',
        controller: 'testCtlr'
      }).
      otherwise({
        redirectTo: '/search'
      });
  }]);