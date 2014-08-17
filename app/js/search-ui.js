var ui = (function(){
  var $departure = document.getElementById('departure');
  var $initialReturnDateValue = $('#stay p')[0].innerHTML;

  if(!$departure.value || $departure.value == null){
    addRule('#stay', 'opacity', '.7');
  }

  $departure.onchange = function() {
    $departure.dataset.departure = $departure.value;
    if(!$departure.value || $departure.value == null){
      $('#stay p')[0].innerHTML = $initialReturnDateValue;
      $('#stay .droption-menu input')[0].value = 0;
      addRule('#stay', 'opacity', '.7');
    } else {
      removeRule('#stay', 'opacity');
    }
  }




  $('.droption p').click(function(){
    var parent = this.parentElement;
    var dropMenu = parent.childNodes[3];
    var display = $(dropMenu).css("display");
    if(display == 'none' && parent.id == 'passengers') {
      $(dropMenu).slideDown("ease");
      addRule(parent, "box-shadow", "inset 0 0 3px #F2672D");
    } else if(display == 'none' && parent.id == 'stay' && $departure.value) {
      $(dropMenu).slideDown("ease");
      addRule(parent, "box-shadow", "inset 0 0 3px #F2672D");
    } else {
      $(dropMenu).slideUp("ease");
      removeRule(parent, "box-shadow");
    }

  });

  var vals = vals || {
    'adults': 0,
    'seniors': 0,
    'youth': 0,
    'children': 0,
    'seatInfants': 0,
    'lapInfants': 0 
  };

  $('.incrementor button').click(function(e){
    e.preventDefault();

    var formInput,
        inputName;
    var selectedInput = $(this).siblings('input')[0];
    var type = this.parentElement.previousElementSibling.innerHTML;
    var inputValue = selectedInput.value
    var inputData = selectedInput.dataset;
    var rawInputData = parseInt(inputValue);
    var gggrandparent = this.parentElement.parentElement.parentElement.parentElement;
    var data = gggrandparent.dataset;
    
    
    // PASSENGER INCREMENT -----------------------------------------
    if(this.dataset.buttonType == 'increment' && data['passengerTotal']){
      selectedInput.value = (formLogic.add(rawInputData));
      inputData[transformString(type)] = (formLogic.add(rawInputData));
      
      vals[transformString(type)] = parseInt(inputData[transformString(type)]);
      

      var passengerTotal = formLogic.sumObjProps(vals);
      

      data.passengerTotal = passengerTotal;
      updatePassengers(passengerTotal);
        
    }

    // DATE INCREMENT --------------------------------------------------
    if(this.dataset.buttonType == 'increment' && data['return']){
      var daysDescription = selectedInput.parentElement.nextElementSibling;
      selectedInput.value = (formLogic.add(rawInputData));
      var days = inputData['daysCount'] = (formLogic.add(rawInputData));

      if(selectedInput.value == 1){
        daysDescription.innerHTML = 'day';
      } else {
        daysDescription.innerHTML = 'days';
      }

      var returnDate = formLogic.calcDate($departure.value, days, 'add');

      data.return = returnDate.year + '-' + returnDate.month + '-' + returnDate.day;
      updateReturnDate(returnDate.month, returnDate.day, returnDate.year);
  
    }


    // PASSENGER DECREMENT -----------------------------------------------
    if(this.dataset.buttonType == 'decrement' && data['passengerTotal']){
      selectedInput.value = (formLogic.subtract(rawInputData));
      inputData[transformString(type)] = (formLogic.subtract(rawInputData));

      vals[transformString(type)] = parseInt(inputData[transformString(type)]);
      

      var passengerTotal = formLogic.sumObjProps(vals);
      

      data.passengerTotal = passengerTotal;
      updatePassengers(passengerTotal);

    }

    // DATE DECREMENT ----------------------------------------------
    if(this.dataset.buttonType == 'decrement' && data['return']){
      selectedInput.value = (formLogic.subtract(rawInputData));
      var daysDescription = selectedInput.parentElement.nextElementSibling;
      var days = inputData['daysCount'] = (formLogic.subtract(rawInputData));
      console.log(days);

      if(selectedInput.value == 1){
        daysDescription.innerHTML = 'day';
      } else {
        daysDescription.innerHTML = 'days';
      }

      var returnDate = formLogic.calcDate($departure.value, (days + 1), 'subtract');

      data.return = returnDate.year + '-' + returnDate.month + '-' + returnDate.day;
      updateReturnDate(returnDate.month, returnDate.day, returnDate.year);
    }
  });

  $('.big-btn').click(function(e){
    e.preventDefault();
  });

  function addRule (element, property, rule) {
    $(element).css(property, rule);
  }
  function removeRule (element, property) {
    $(element).css(property, "");
  }

  function updatePassengers(newContent){
    var el = $('#passengers p')[0];
    if(newContent == 1){
      el.innerHTML = newContent + " passenger";  
    } else {
      el.innerHTML = newContent + " passengers";
    }
  }

  function updateReturnDate(month, day, year) {
    var el = $('#stay p')[0];
    el.innerHTML = month + '/' + day + '/' + year;
  }

  function transformString(string){
    var re = /[^\w* ]/g;
    var plainString = string.replace(re, '');
    var stringArray = plainString.toLowerCase().split(' ');
    if(stringArray.length > 1){
      stringArray = stringArray.reverse('');
      for(var word = 1; word < stringArray.length; word++){
        stringArray[word] = stringArray[word][0].toUpperCase() + stringArray[word].substr(1);
        // stringArray[word] = stringArray[word][0].toUpperCase() + stringArray[word].substr(1);
      }
    }
    return stringArray.join('');
  }

})();