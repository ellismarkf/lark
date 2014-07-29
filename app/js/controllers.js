'use strict';

var vultureControllers = angular.module('vultureControllers', []);

vultureControllers.controller('searchCtlr', ['$scope', 'Destination'
  function($scope, Destination) {
    $scope.cities = Destination.query();
  }]);