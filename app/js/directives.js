'use strict';
var vultureDirectives = angular.module('vultureDirectives', []);

vultureDirectives.directive('searchFormSubmitter', ['$document', 'Flights',
  function($document, Flights) {
    return function(scope, element, attr) {

      // scope.inputData = [];


      element.on('click', function(event){
        // console.log('are cities present?: ', scope.cities);
        event.preventDefault();
        // console.log('directive working');
        collectInputData(scope.inputs);
        // console.log(scope.inputData);
        for(var city in scope.cities){
          var trip = formatData(scope.inputData, city, scope.cities);
          if(trip.request.slice[0])
          scope.requestPackage.push(formatData(scope.inputData, city, scope.cities));
        }
        scope.requestPackage.splice(4, scope.requestPackage.length - 4)
        // console.log(scope.requestPackage);
        Flights.fetch(scope.requestPackage);
        // console.log('directive finished');
      });


      function collectInputData(arrayOfInputs){
        for(var i = 0; i < arrayOfInputs.length; i++){
          if(arrayOfInputs[i].hasChildNodes()){
            collectInputData(arrayOfInputs[i].children);
          }
          // console.log(arrayOfInputs[i]);
          if(arrayOfInputs[i].tagName == 'INPUT'){
            var jsonString = JSON.stringify(arrayOfInputs[i].dataset),
                inputObject = JSON.parse(jsonString),
                keys = Object.keys(inputObject);
                length = objLength(inputObject);
            if(length > 1){
              for(var k = 0; k < length; k++){
                scope.inputData[keys[k]] = inputObject[keys[k]];
              }
            }
            // debugger;
            scope.inputData[keys[0]] = inputObject[keys[0]];
            // scope.inputData.push(JSON.parse(jsonString));
          }
        }
        // console.log(scope.inputData);
        return scope.inputData;
      }

      function formatData(formValuesObject, passedCityVar, citiesObject) {

        var data = {},
            trip = formValuesObject,
            legs = ['outbound','return'];

        var r = data.request = {},
            s = r.slice = [],
            p = r.passengers = {};
            r.solutions = 1;
            r.refundable = false;

        for(var l = 0; l < legs.length; l++){
          var leg = s[l] = {};
          if(legs[l] == 'outbound'){
            leg.origin = getKeyByValue(citiesObject, trip.origin);
            leg.destination = passedCityVar;
            leg.date = trip.outbound;
          } else if(legs[l] == 'return'){
            leg.origin = passedCityVar;
            leg.destination = getKeyByValue(citiesObject, trip.origin);
            leg.date = trip.return;
          }
        }

        p.adultCount        = parseInt(trip.adults);
        p.seniorCount       = parseInt(trip.seniors);
        p.childCount        = parseInt(trip.children) + parseInt(trip.youth);
        p.infantInSeatCount = parseInt(trip.seatInfants);
        p.infantInLapCount  = parseInt(trip.lapInfants);


        console.log('data is: ', data);
        return data;

      }

      function objLength(obj){
        var sum = 0;
        for(var prop in obj){
          sum += 1;
        }
        return sum;
      }

      function getKeyByValue(object, value) {
        for( var prop in object ) {
            if( object.hasOwnProperty( prop ) ) {
                if( object[ prop ] === value )
                  return prop;
            }
        }
      }

    };
}]);

vultureDirectives.directive('mockFormSubmitter', ['$document', 'Flights',
  function($document, Flights) {
    return function(scope, element, attr) {

      // scope.inputData = [];


      element.on('click', function(event){
        // console.log('are cities present?: ', scope.cities);
        event.preventDefault();
        // console.log('directive working');
        collectInputData(scope.inputs);
        // console.log(scope.inputData);
        for(var city in scope.cities){
          var trip = formatData(scope.inputData, city, scope.cities);
          if(trip.request.slice[0])
          scope.requestPackage.push(formatData(scope.inputData, city, scope.cities));
        }
        // console.log(scope.requestPackage);
        // Flights.fetch(scope.requestPackage);
        // console.log('directive finished');
      });


      function collectInputData(arrayOfInputs){
        for(var i = 0; i < arrayOfInputs.length; i++){
          if(arrayOfInputs[i].hasChildNodes()){
            collectInputData(arrayOfInputs[i].children);
          }
          // console.log(arrayOfInputs[i]);
          if(arrayOfInputs[i].tagName == 'INPUT'){
            var jsonString = JSON.stringify(arrayOfInputs[i].dataset),
                inputObject = JSON.parse(jsonString),
                keys = Object.keys(inputObject);
                length = objLength(inputObject);
            if(length > 1){
              for(var k = 0; k < length; k++){
                scope.inputData[keys[k]] = inputObject[keys[k]];
              }
            }
            // debugger;
            scope.inputData[keys[0]] = inputObject[keys[0]];
            // scope.inputData.push(JSON.parse(jsonString));
          }
        }
        // console.log(scope.inputData);
        return scope.inputData;
      }

      function formatData(formValuesObject, passedCityVar, citiesObject) {

        var data = {},
            trip = formValuesObject,
            legs = ['outbound','return'];

        var r = data.request = {},
            s = r.slice = [],
            p = r.passengers = {};
            r.solutions = 1;
            r.refundable = false;

        for(var l = 0; l < legs.length; l++){
          var leg = s[l] = {};
          if(legs[l] == 'outbound'){
            leg.origin = getKeyByValue(citiesObject, trip.origin);
            leg.destination = passedCityVar;
            leg.date = trip.outbound;
          } else if(legs[l] == 'return'){
            leg.origin = passedCityVar;
            leg.destination = getKeyByValue(citiesObject, trip.origin);
            leg.date = trip.return;
          }
        }

        p.adultCount        = parseInt(trip.adults);
        p.seniorCount       = parseInt(trip.seniors);
        p.childCount        = parseInt(trip.children) + parseInt(trip.youth);
        p.infantInSeatCount = parseInt(trip.seatInfants);
        p.infantInLapCount  = parseInt(trip.lapInfants);


        console.log('data is: ', data);
        return data;

      }

      function objLength(obj){
        var sum = 0;
        for(var prop in obj){
          sum += 1;
        }
        return sum;
      }

      function getKeyByValue(object, value) {
        for( var prop in object ) {
            if( object.hasOwnProperty( prop ) ) {
                if( object[ prop ] === value )
                  return prop;
            }
        }
      }

    };
}]);