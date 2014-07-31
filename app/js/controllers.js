'use strict';

var vultureControllers = angular.module('vultureControllers', ['ngResource']);

vultureControllers.controller('searchCtlr', ['$scope', '$resource', 'Destination', 'CityCode',
  function($scope, $resource, Destination, CityCode) {

    var apiPromise = $resource('api-key.json');
    apiPromise.get().$promise.then(function (key){
      console.log('api key promise: ', key);
      var apiKey = key["API_KEY"];
      console.log('api key object: ', apiKey);
      // $scope.key = apiKey;
      // return $http.get(ulr&key={apiKey});
    }).then(function (response) {

    });

    var c = {};

    CityCode.get().$promise.then(function (cities){
      for(var city in cities){
        c[city] = cities[city];
      }
      console.log("cities: ", c);
      return c;
    });


    // Destination.query().$promise.then(function (tripData) {
    //   console.log('Trip data:', tripData);

    //   var result = [];
    //   // Massage tripData and put into result

    //   for(var i = 0; i < tripData.length; i += 1) {
    //     var destinationPath = tripData[i].trips.tripOption[0].pricing[0].fare;
    //     var option = {};
    //     option.destination = destinationPath[destinationPath.length - 1].destination;
    //     var price = tripData[i].trips.tripOption[0].saleTotal;
    //     var numPrice = parseInt((price.slice(3,price.length)));
    //     option.price = numPrice;

    //     option.cityName = c[option.destination];
    //     console.log('Option:', option);
    //     result.push(option);
    //   };

    //   $scope.trips = result;
    //   $scope.predicate = '';
    //   $scope.number = 5000;
    // });
  }]);

vultureControllers.controller('resultsCtlr', ['$scope', 'Destination', 'CityCode',
  function($scope, Destination, CityCode){

    var c = {};

    CityCode.get().$promise.then(function (cities){
      for(var city in cities){
        c[city] = cities[city];
      }
      console.log("cities: ", c);
      return c;
    });

    Destination.query().$promise.then(function (tripData) {
      console.log('Trip data:', tripData);

      var result = [];
       // Massage tripData and put into result

      for(var i = 0; i < tripData.length; i += 1) {
        var destinationPath = tripData[i].trips.tripOption[0].pricing[0].fare;
        var option = {};
        option.destination = destinationPath[destinationPath.length - 1].destination;
        var price = tripData[i].trips.tripOption[0].saleTotal;
        var numPrice = parseInt((price.slice(3,price.length)));
        option.price = numPrice;
        option.cityName = c[option.destination];
        console.log('Option:', option);
        result.push(option);
      };

      $scope.trips = result;
      $scope.predicate = '';
      $scope.number = 5000;
    });

  }]);