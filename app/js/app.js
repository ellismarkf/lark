'use strict';

var vulture = angular.module('vulture' [
    'ngRoute',
    'vultureControllers',
    'vultureFilters',
    'vultureServices'
  ]);

vulture.config([
  function($routeProvider) {
    $routeProvider.
      when('/search', {
        templateUrl: 'partials/search.html',
        controller: 'searchCtlr'
      }).
      when('/results', {
        templateUrl: 'partials/results.html',
        controller: 'resultsCtlr'
      }).
      otherwise({
        redirectTo: '/search'
      });
  }]);