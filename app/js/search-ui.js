var ui = (function(){
  var $departure = document.getElementById('departure');
  $departure.onchange = function() {
    $departure.dataset.departure = $departure.value;
    console.log($departure.dataset.departure);
  }

  $('.droption p').click(function(){
    var parent = this.parentElement;
    var dropMenu = parent.childNodes[3];
    var display = $(dropMenu).css("display");
    if(display == 'none' && parent.id == 'passengers') {
      $(dropMenu).slideDown("ease");
      addRule(parent, "box-shadow", "inset 0 0 3px #F2672D");
    } else if(display == 'none' && parent.id == 'stay') {
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
    var typeData = selectedInput.dataset;
    var rawData = parseInt(inputValue);
    var gggrandparent = this.parentElement.parentElement.parentElement.parentElement;
    var data = gggrandparent.dataset;
    
    
    
    if(this.dataset.buttonType == 'increment' && data['passengerTotal']){
      selectedInput.value = (formLogic.add(rawData));
      typeData[transformString(type)] = (formLogic.add(rawData));
      
      vals[transformString(type)] = parseInt(typeData[transformString(type)]);
      

      var passengerTotal = formLogic.sumObjProps(vals);
      

      data.passengerTotal = passengerTotal;
      updatePassengers(passengerTotal);
        
    }
    if(data['return']){

    }

    if(this.dataset.buttonType == 'decrement'){
      selectedInput.value = (formLogic.subtract(rawData));
      typeData[transformString(type)] = (formLogic.subtract(rawData));

      if(data['passengerTotal']){
        vals[transformString(type)] = parseInt(typeData[transformString(type)]);
        

        var passengerTotal = formLogic.sumObjProps(vals);
        

        data.passengerTotal = passengerTotal;
        updatePassengers(passengerTotal);

      }
      if(data['return']){
        
      }
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