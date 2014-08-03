'use strict';

var vultureControllers = angular.module('vultureControllers', ['ngResource']);

vultureControllers.controller('')

vultureControllers.controller('searchCtlr', ['$scope', '$rootScope', '$resource', '$http', 'Destination', 'CityCode',
  function($scope, $rootScope, $resource, $http, Destination, CityCode) {

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

    // retrieve city codes and store in accessible object

    var c = {};

    CityCode.get().$promise.then(function (cities){
      for(var city in cities){
        c[city] = cities[city];
      }
      return c;
    });

    // utilities

    function objectLength(object) {
      var size = 0;
      for( var property in object){
        size++;


      }
    }

    function getKeyByValue(object, value) {
      for( var prop in object ) {
          if( object.hasOwnProperty( prop ) ) {
              if( object[ prop ] === value )
                return prop;
          }
      }
    }

    // form functions

    var searchForm = document.getElementById('search');

    function collectVals(city) {
      var data = {};
      data.request = {};
      data.request.passengers = {
        "infantInLapCount": 0,
        "infantInSeatCount": 0,
        "childCount": 0,
        "seniorCount": 0
      };
      data.request.solutions = 1;
      data.request.refundable = false;
      var sliceInfo = {};
      sliceInfo.destination = city;
      data.request.slice = [sliceInfo];
      for(var input = 0; input < searchForm.elements.length; input++){
        var inputName = searchForm.elements[input].name;
        var inputVal = searchForm.elements[input].value;

        switch(inputName){
          case "origin":
            sliceInfo[inputName] = getKeyByValue(c, inputVal);
            break;
          case "date":
            sliceInfo[inputName] = inputVal;
            break;
          case "passengers":
            data.request.passengers.adultCount = parseInt(inputVal);
        }
      }
      console.log('data is: ', data);
      return data;
    }

    // document.getElementById('test').addEventListener('click', collectVals);
    var requestPackage = [];
    $scope.responsePackage = [];

    document.getElementById('test').addEventListener('click', function(){
      var requestPackage = [];
      for( var city in c ) {
        requestPackage.push(collectVals(city));
      }

      // return requestPackage;

      requestPackage.splice(1, requestPackage.length - 1);

      async.eachSeries(requestPackage, function(request, callback){
        console.log('doing something');
        $http.post('https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyDLQxMkWe1rg9w1a1sqXxxObRvYrujjj4w',
            request)
        .success(function(response){
          console.log('response from the server: ', response);
          $scope.response = response;
          $scope.responsePackage.push($scope.response);
          console.log('the response package is: ', $scope.responsePackage);

        });

        callback();

      }, function(err){
        if(err){
          console.log('something went wrong!');
        } else {
          console.log('all is well! your requests have been sent!');
          return $scope.responsePackage;
        }
      });
      console.log('I doubt this will work, but if it does: ', $scope.responsePackage);
    });
    // searchForm.addEventListener('submit', collectVals);

    console.log("searchForm captured", searchForm.elements.length);


    // searchForm.onsubmit(){

    // }

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
        option.duration = (duration / 60).toFixed(2);

        option.cityName = c[option.destination];

        result.push(option);
      };

      $scope.trips = result;
      $scope.predicate = '';
      $scope.number = 5000;
    });

  }]);