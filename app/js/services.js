'use strict';

var vultureServices = angular.module('vultureServices', ['ngResource']);

vultureServices.factory('Destination', ['$resource',
  function($resource) {
    return $resource('cities/:city.json', {}, {
      query: {method: 'GET', params:{city: 'all'}, isArray:true}
    });
  }]);