'use strict';

var vultureFilters = angular.module('vultureFilters', []);

vultureFilters.filter('priceMax', function() {
  return function(trips, number) {
    var cheaper = [];
    for(var i = 0; i < trips.length; i++){
      var trip = trips[i];
      if(number == null){
        return trips;
      } else if(trip.price < number){
        cheaper.push(trip);
      }
    }
    return cheaper;
  };
});