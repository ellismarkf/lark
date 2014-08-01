'use strict';

var vultureControllers = angular.module('vultureControllers', ['ngResource']);

vultureControllers.controller('')

vultureControllers.controller('searchCtlr', ['$scope', '$rootScope', '$resource', 'Destination', 'CityCode',
  function($scope, $rootScope, $resource, Destination, CityCode) {

    $rootScope.test = "this is a test of rootScope";

    $rootScope.secondTest = {
      val: "another test of rootScope variables"
    }
    $scope.test = $rootScope.secondTest.val;


    var apiPromise = $resource('api-key.json');
    apiPromise.get().$promise.then(function (key){

      var apiKey = key["API_KEY"];

      // $scope.key = apiKey;
      // return $http.get(ulr&key={apiKey});
    }).then(function (response) {

    });

    var c = {};

    CityCode.get().$promise.then(function (cities){
      for(var city in cities){
        c[city] = cities[city];
      }
      return c;
    });


    // form.onsubmit(){
    //   $http({
    //     type: post
    //     url: google api
    //     param
    //   })
    // }

  }]);

vultureControllers.controller('resultsCtlr', ['$scope', '$rootScope', 'Destination', 'CityCode',
  function($scope, $rootScope, Destination, CityCode){

    var c = {};

    CityCode.get().$promise.then(function (cities){
      for(var city in cities){
        c[city] = cities[city];
      }
      return c;
    });

    Destination.query().$promise.then(function (tripData) {

      var result = [];
       // Massage tripData and put into result

      for(var i = 0; i < tripData.length; i += 1) {
        var option = {};

        var destinationPath = tripData[i].trips.tripOption[0].pricing[0].fare;
        option.destination = destinationPath[destinationPath.length - 1].destination;

        var price = tripData[i].trips.tripOption[0].saleTotal;
        var numPrice = parseInt((price.slice(3,price.length)));
        option.price = numPrice;

        var segments = tripData[i].trips.tripOption[0].slice[0].segment;
        var distance = 0;
        for(var j = 0; j < segments.length; j++){
          distance = segments[j].leg[0].mileage + distance;
        }
        option.distance = distance;

        var duration = tripData[i].trips.tripOption[0].slice[0].duration;
        option.duration = duration;

        option.cityName = c[option.destination];

        result.push(option);
      };

      $scope.trips = result;
      $scope.predicate = '';
      $scope.number = 5000;
    });

  }]);