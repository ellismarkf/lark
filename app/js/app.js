'use strict';

var vulture = angular.module('vulture', [
    'ngRoute',
    'vultureControllers'
  ]);

vulture.config(['$routeProvider',
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