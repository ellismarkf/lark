var formLogic = (function(){

  function increment (value) {
    return ++value;
  }

  function subtract (value) {
    if(value > 0) {
      return --value;
    } else {
      return value;
    }
  }

  function calcDate (selectedDate, days, operation) {
    var departureDate = Date.parse(selectedDate);
    if(operation == 'add'){
      var theFuture = new Date(+(new Date(departureDate)) + (1000 * 60 * 60 * 24 * (days+1)));

    } else if(operation = 'subtract'){
      var backToTheFuture = new Date(+(new Date(departureDate)) + (1000 * 60 * 60 * 24 * (days+1)));

      var theFuture = new Date(+(new Date(backToTheFuture)) - (1000 * 60 * 60 * 24));

    } else {
      return false;
    }
    var returnDate = {};
    returnDate.month = theFuture.getMonth()+1;
    returnDate.day = theFuture.getDate();
    returnDate.year = theFuture.getFullYear();
    return returnDate;
  }

  function sumStringNums(array) {
    var total = 0;
    for(var i = 0; i < array.length; i++){

      total = total + parseInt(array[i]);

    }
    return total;
  }

  function collect(array, iterator){
    var newArr = [];
    for(var i = 0; i < array.length; i++){
      var newVal = iterator(array[i]);
      newArr.push(newVal);
    }
    return newArr;
  }

  function sumObjProps(obj){
    var sum = 0;
    for(var prop in obj){
      sum += obj[prop];
    }
    return sum;
  }

  function objLength(obj){
    var sum = 0;
    for(var prop in obj){
      sum += 1;
    }
    return sum;
  }
  return {
    add: increment,
    subtract: subtract,
    calcDate: calcDate,
    sumStringNums: sumStringNums,
    sumObjProps: sumObjProps,
    objLength: objLength
  }
})();