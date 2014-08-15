$('.droption').click(function(){
  var that = $(this)[0];
  var other = that.childNodes[3];
  var display = $(other).css("display");
  if(display == 'none' && this.id == 'passengers') {
    $(other).slideDown("ease");
  } else if(display == 'none' && this.id == 'stay') {
    $(other).slideDown("ease");
  } else {
    $(other).slideUp("ease");
  }
});