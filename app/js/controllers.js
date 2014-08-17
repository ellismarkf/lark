'use strict';

var vultureControllers = angular.module('vultureControllers', ['ngResource']);

vultureControllers.controller('searchCtlr', ['$scope', '$rootScope', '$resource', '$http', '$location', 'Destination', 'CityCode', 'test', 'Flights',
  function($scope, $rootScope, $resource, $http, $location, Destination, CityCode, test, Flights) {

    // retrieve city codes and store in accessible object

    var c = {};

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
        c[city] = cities[city];
      }
      return c;
    });

    // utilities

    function getKeyByValue(object, value) {
      for( var prop in object ) {
          if( object.hasOwnProperty( prop ) ) {
              if( object[ prop ] === value )
                return prop;
          }
      }
    }


    var tripData = [];

    $scope.goToPage = function ( path ) {
      $location.path( path );
    };

    document.getElementById('submit').addEventListener('click', function(){
      Flights.fetch(c)
    });

  }]);

vultureControllers.controller('resultsCtlr', ['$scope', '$rootScope', 'Destination', 'CityCode', 'test', 'Flights',
  function($scope, $rootScope, Destination, CityCode, test, Flights){

    var c = {};

    CityCode.get().$promise.then(function (cities){
      for(var city in cities){
        c[city] = cities[city];
      }
      return c;
    });

    // $scope.trips = [];

    // var data = Flights.get();
    //    // result = [];


    // for(var t = 0; t < data.length; t++){
    //   data[t].then(function (tripData) {
    //     var tripData = JSON.parse(tripData);
    //     var option = {};

    //     // console.log(tripData.trips.tripOption[0].pricing[0].fare);

    //     var destinationPath = tripData.trips.tripOption[0].pricing[0].fare;
    //     option.destination = destinationPath[destinationPath.length - 1].destination;

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
    // $scope.predicate = '';
    // $scope.number = 5000;

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

      // $scope.trips = result;
    });
    var priceSlider = document.getElementById('price');
    var durationSlider = document.getElementById('duration');

    $scope.predicate = '';
    $scope.number = getPriceValue();
    $scope.hours = getDurationValue();



    function getPriceValue (){
      return priceSlider.value;
    }

    function getDurationValue (){
      return durationSlider.value;
    }
  }]);

















