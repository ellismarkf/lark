var ui = (function(){
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

  $('.incrementor button').click(function(e){
    e.preventDefault();
    var formInput,
        inputName;
    var selectedInput = $(this).siblings('input')[0]
    var inputValue = selectedInput.value
    var passengerCount = parseInt(inputValue);
    var totalPassengers = $('#passengers')[0];
    if(this.dataset.buttonType == 'increment'){
      selectedInput.value = (formLogic.add(passengerCount));
      totalPassengers.dataset.passengerTotal = (formLogic.add(parseInt(totalPassengers.dataset.passengerTotal)));
      console.log(totalPassengers.dataset.passengerTotal);
    }
    if(this.dataset.buttonType == 'decrement'){
      selectedInput.value = (formLogic.subtract(passengerCount));
      totalPassengers.dataset.passengerTotal = (formLogic.subtract(parseInt(totalPassengers.dataset.passengerTotal)));
    }
    formInput = $('select[name="passengers"]')[0];

    formInput.childNodes[1].value = selectedInput.value;

    updatePassengers(totalPassengers.dataset.passengerTotal);
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

})();