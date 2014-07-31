'use strict';

var vultureServices = angular.module('vultureServices', ['ngResource']);

vultureServices.factory('Destination', ['$resource',
  function($resource) {
    return $resource('cities/:city.json', {}, {
      query: {method: 'GET', params:{city: 'all'}, isArray:true}
    });
  }]);

vultureServices.factory('CityCode', ['$resource',
  function($resource) {
    return $resource('cities/city-codes.json', {}, {
      get: {method: 'GET'}
    });
  }]);

vultureServices.factory('apiKey', ['$resource',
  function($resource){
    return $resource('api-key.json',{
      get: {method: 'GET'}
    });
  }]);

// 'POST', 'https://www.googleapis.com/qpxExpress/v1/trips/search&key={API_KEY}'