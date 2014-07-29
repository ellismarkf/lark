'use strict';

var vultureControllers = angular.module('vultureControllers', []);

vultureControllers.controller('searchCtlr', ['$scope', 'Destination',
  function($scope, Destination) {

    Destination.query().$promise.then(function (tripData) {
      console.log('Trip data:', tripData);

      var result = [];
      // Massage tripData and put into result

      for(var i = 0; i < tripData.length; i += 1) {
        var option = {};
        option.destination = tripData[i].trips.tripOption[0].pricing[0].fare[0].destination;
        option.price = tripData[i].trips.tripOption[0].saleTotal;
        console.log('Option:', option);
        result.push(option);
      };

      $scope.trips = result;
    });
  }]);