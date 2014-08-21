$('.tall').css('height', window.innerHeight + $('.trips-container').height());

window.addEventListener('scroll', function (e) {
  if(document.body.scrollTop > 50) {
    $('#cp').css({'position':'fixed', 'top':'0px'});

  } else if(document.body.scrollTop < 50){
    $('#cp').css('position', '');
  }
  // console.log(document.body.scrollTop);
})