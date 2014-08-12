'use strict';

var vultureFilters = angular.module('vultureFilters', []);

vultureFilters.filter('priceMax', function() {
  return function(trips, number) {
    var cheaper = [];
    for(var i = 0; i < trips.length; i++){
      var trip = trips[i];
      if(trip.price < number){
        cheaper.push(trip);
      }
    }
    return cheaper;
  };
});

vultureFilters.filter('durationMax', function() {
  return function(trips, hours) {
    var shorter = [];
    for(var i = 0; i < trips.length; i++){
      var trip = trips[i];
      if(parseFloat(trip.duration) < parseFloat(hours)){
        shorter.push(trip);
      }
    }
    return shorter;
  };
});