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
      console.log('the real future: ', Date.parse(theFuture));
    } else if(operation = 'subtract'){
      var backToTheFuture = new Date(+(new Date(departureDate)) + (1000 * 60 * 60 * 24 * (days+1)));
      console.log('back to the future: ', backToTheFuture, Date.parse(backToTheFuture));
      var theFuture = new Date(+(new Date(backToTheFuture)) - (1000 * 60 * 60 * 24));
      console.log('theFuture: ', theFuture, theFuture.getMonth()+1, theFuture.getDate(), theFuture.getFullYear());
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
      console.log('current sum string value: ', array[i]);
      total = total + parseInt(array[i]);
      console.log('string sum total: ', total);
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

  return {
    add: increment,
    subtract: subtract,
    calcDate: calcDate,
    sumStringNums: sumStringNums,
    sumObjProps: sumObjProps
  }
})();