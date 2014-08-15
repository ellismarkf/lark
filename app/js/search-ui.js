$('.droption').click(function(){
  var hidden = $('.droption-menu').css("display");
  var hasMenu = $(this);
  console.log(this.id);
  console.log(this.contains(div));
  if(hidden == 'none' && this.id == 'passengers') {
    $('#p').show();
  } else if(this.id == 'stay') {
    $('#s').show();
  } else {
    $('.droption-menu').hide();
  }
});