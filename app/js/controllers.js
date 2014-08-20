'use strict';

var vultureControllers = angular.module('vultureControllers', ['ngResource']);

vultureControllers.controller('searchCtlr', ['$scope', '$rootScope', '$resource', '$http', '$location', '$routeParams', 'Destination', 'CityCode', 'Flights',
  function($scope, $rootScope, $resource, $http, $location, $routeParams, Destination, CityCode, Flights) {

    $scope.inputs = document.getElementById('search');
    $scope.inputData = {};
    $scope.requestPackage = [];
    $scope.cities = {};

    console.log('route params: ', $routeParams);

    // retrieve city codes and store in accessible object

    function checkEscaped(value, object){
      if(value == object[value]){
        return true;
      }
    }

    CityCode.get().$promise.then(function (cities){
      var escaped = {
        "$promise": "$promise",
        "$resolved": "$resolved",
        "$get": "$get",
        "$save": "$save",
        "$query": "$query",
        "$remove": "$remove",
        "$delete": "$delete"
      }
      for(var city in cities){
        if(checkEscaped(city, escaped)){
            return;
        }
        $scope.cities[city] = cities[city];
      }
      return $scope.cities;
    });

    // utilities

    $scope.goToPage = function ( path ) {
      $location.path( path );
    };

    // document.getElementById('submit').addEventListener('click', function(e){
    //   // e.preventDefault();
    //   $scope.inputData = {};
    //   Flights.fetch($scope.cities)
    // });

  }]);

vultureControllers.controller('resultsCtlr', ['$scope', '$rootScope', '$routeParams', 'Destination', 'CityCode', 'Flights',
  function($scope, $rootScope, $routeParams, Destination, CityCode, Flights){


    console.log('route params: ', $routeParams);

    var c = {};

    CityCode.get().$promise.then(function (cities){
      for(var city in cities){
        c[city] = cities[city];
      }
      return c;
    });

    // COMMENT IN/OUT FOR API RESPONSE INTERPOLATION ----------------------------------

    // $scope.trips = [];

    // var data = Flights.get();
    //    // result = [];


    // for(var t = 0; t < data.length; t++){
    //   data[t].then(function (tripData) {
    //     var tripData = JSON.parse(tripData);
    //     console.log(tripData);
    //     var option = {};

    //     // console.log(tripData.trips.tripOption[0].pricing[0].fare);

    //     var destinationPath = tripData.trips.tripOption[0].pricing[0].fare;
    //     option.destination = destinationPath[0].destination;

    //     var price = tripData.trips.tripOption[0].saleTotal;
    //     var numPrice = parseInt((price.slice(3,price.length)));
    //     option.price = numPrice;

    //     var segments = tripData.trips.tripOption[0].slice[0].segment;
    //     var distance = 0;
    //     for(var j = 0; j < segments.length; j++){
    //       distance = segments[j].leg[0].mileage + distance;
    //     }
    //     option.distance = distance;

    //     var duration = tripData.trips.tripOption[0].slice[0].duration;
    //     option.duration = (duration / 60).toFixed(2);

    //     option.cityName = c[option.destination];
    //     option.origin = c[tripData.trips.tripOption[0].pricing[0].fare[0].origin];
    //     console.log('option: ', option);

    //     $scope.$apply(function() {
    //       $scope.trips.push(option);
    //     });
    //     console.log('scope array: ', $scope.trips);
    //     // console.log('result: ', result);

    //     // $scope.trips = result;
    //     // console.log('scope variable: ', $scope.trips);

    //   });
    // }

    // END COMMENT IN/OUT FOR API RESPONSE INTERPOLATION -------------------------------
    // $scope.predicate = '';
    // $scope.number = 5000;

    // COMMENT IN/OUT FOR HARD-CODED CITY INTERPOLATION -------------------------------

    Destination.query().$promise.then(function (tripData){


      $scope.trips = [];
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
        option.duration = (duration / 60).toFixed(2);

        option.cityName = c[option.destination];

        $scope.trips.push(option);

      };
    });

    // END COMMENT IN/OUT FOR HARD-CODED CITY INTERPOLATION

    var priceSlider = document.getElementById('price');
    var durationSlider = document.getElementById('duration');

    $scope.predicate = '';
    $scope.number = getPriceValue();
    $scope.hours = getDurationValue();
    $scope.origin = $routeParams.origin;



    function getPriceValue (){
      return priceSlider.value;
    }

    function getDurationValue (){
      return durationSlider.value;
    }
  }]);

















