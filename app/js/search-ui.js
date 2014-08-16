$('.droption p').click(function(){
  console.log(this);
  var parent = this.parentElement;
  var dropMenu = parent.childNodes[3];
  var display = $(dropMenu).css("display");
  if(display == 'none' && parent.id == 'passengers') {
    $(dropMenu).slideDown("ease");
  } else if(display == 'none' && parent.id == 'stay') {
    $(dropMenu).slideDown("ease");
  } else {
    $(dropMenu).slideUp("ease");
  }
});

$('.incrementor button').click(function(e){
  e.preventDefault();
  var formInput;
  var selectedInput = $(this).siblings('input')[0]
  var inputValue = selectedInput.value
  var passengerCount = parseInt(inputValue);
  if(this.dataset.buttonType == 'increment'){
    selectedInput.value = (formLogic.add(passengerCount));
  }
  if(this.dataset.buttonType == 'decrement'){
    selectedInput.value = (formLogic.subtract(passengerCount));
  }
  formInput = $('select[name="passengers"]')[0];
  console.log(formInput.value);
});

$('.big-btn').click(function(e){
  e.preventDefault();
});