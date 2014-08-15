$('.droption').click(function(){
  var that = $(this)[0];
  var other = that.childNodes[3];
  var display = $(other).css("display");
  console.log(display);
  if(display == 'none' && this.id == 'passengers') {
    $(other).show();
  } else if(display == 'none' && this.id == 'stay') {
    $(other).show();
  } else {
    console.log("what's being hidden? ", other);
    $(other).hide();
  }
});