'use strict';

var vultureServices = angular.module('vultureServices', ['ngResource']);

vultureServices.factory('Destination', ['$resource', '$rootScope',
  function($resource, $rootScope) {
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

vultureServices.factory('test', [
  function(){
    var testArr = [];
    function populateArr (){
      testArr = [];
      for(var i = 0; i < 11; i++){
        testArr.push(i);
      }
    }
    return {
      popArr: populateArr,
      getArr: function(){
        return testArr;
      }
    }
  }]);

vultureServices.factory('Flights', [ '$http', '$rootScope',
  function($http, $rootScope){

    var requestPackage = [],
        responsePackage = [];

    $rootScope.resData = [];

    var searchForm = document.getElementById('search');

    function getKeyByValue(object, value) {
      for( var prop in object ) {
          if( object.hasOwnProperty( prop ) ) {
              if( object[ prop ] === value )
                return prop;
          }
      }
    }


    function fetch(cities){
      requestPackage = [];

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
              sliceInfo[inputName] = getKeyByValue(cities, inputVal);
              break;
            case "date":
              sliceInfo[inputName] = inputVal;
              break;
            case "passengers":
              data.request.passengers.adultCount = parseInt(inputVal);
              break;
          }
        }
        // console.log('data is: ', data);
        return data;
      }

      for( var city in cities ) {
        requestPackage.push(collectVals(city));
      }
      // return requestPackage;

      requestPackage.splice(5, requestPackage.length - 5);

      function getFlightData(url, index) {
        return new Promise(function(resolve, reject){
          var req = new XMLHttpRequest();
          req.open('POST', url, true);
          var params = JSON.stringify(requestPackage[request]);
          req.setRequestHeader("Content-type", "application/json; charset=utf-8");

          req.onload = function() {
            if(req.status == 200) {
              resolve(req.response);
            }
            else {
              reject(Error(req.statusText));
            }
          };

          req.onerror = function(){
            reject(Error("Network Error"));
          };
          req.send(params);
        });
      }


      for (var request = 0; request < requestPackage.length; request++){
        responsePackage[request] = getFlightData('https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyDLQxMkWe1rg9w1a1sqXxxObRvYrujjj4w', request);
        // create promise
        // send http request with requestPackage[request]
        // return promise?
      }

      console.log(responsePackage)

      // async.eachSeries(requestPackage, function(request, callback) {
      //   // console.log('doing something');
      //   $http.post('https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyDLQxMkWe1rg9w1a1sqXxxObRvYrujjj4w',
      //       request)
      //   .success(function(response){
      //     $rootScope.resData.push(response)
      //     console.log('response from the server: ', response);
      //     var response = response;
      //     responsePackage.push(response);
      //     console.log('the response package is: ', responsePackage);
      //     callback();
      //   });

      // }, function(err){
      //   if(err){
      //     console.log('something went wrong!');
      //   } else {
      //     console.log('all is well! your requests have been sent!', responsePackage);
      //     return responsePackage;
      //   }
      // });
      return responsePackage;
    }

    function get (){
      return responsePackage;
    }

    return {
      fetch: fetch,
      get: get
    }

  }]);

// 'POST', 'https://www.googleapis.com/qpxExpress/v1/trips/search&key={API_KEY}'