'use strict';
var vultureDirectives = angular.module('vultureDirectives', []);

vultureDirectives.directive('searchFormSubmitter', ['$document',
  function($document) {
    return function(scope, element, attr) {

      element.on('click', function(event){
        event.preventDefault();
        console.log('directive working');
        collectInputData(scope.inputs);
        console.log('directive finished');
      });


      function collectInputData(arrayOfInputs){
        for(var i = 0; i < arrayOfInputs.length; i++){
          if(arrayOfInputs[i].hasChildNodes()){
            collectInputData(arrayOfInputs[i].children);
          }
          console.log(arrayOfInputs[i]);
          if(arrayOfInputs[i].tagName == 'INPUT'){
            var jsonString = JSON.stringify(arrayOfInputs[i].dataset);
            scope.inputData.push(JSON.parse(jsonString));
          }
        }
        console.log(scope.inputData);
        return scope.inputData;
      }

    };
}]);