$(document).ready(function() {
    fade();
    highlight();
    submit(); 
});
    
    function submit() {
      // $('.button--submit').click(function(){
      //   alert("Thanks");
      //   $(this).html("Good Luck!");
      // });
      $('form').submit(function(e) {
        e.preventDefault();
        alert("Thanks");
        $('.button--submit').html("Good Luck!");
      });
    }

    function highlight() {
  		// $('.landingform-content').delegate('input', 'focus blur', function(){
  	 //    	var elem = $(this);
  		// 	elem.closest('.formfields-item-input').toggleClass('focused');
  		// });
      $(':input').focus(function() {
        $(this).addClass('focused').blur(function() {
          $(this).removeClass('focused');
        });
      });
	}

		
  function fade() {
    $('.js-container').fadeIn(1000, function() {
      $('.js-bckgrdlana').fadeIn(1000);
    });
  }

