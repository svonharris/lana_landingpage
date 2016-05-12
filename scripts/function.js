$(document).ready(function() {
    $('.container').fadeIn(1500);
    highlight();
	submit(); 
});
    
    function submit() {
      $('.button--submit').click(function(){
        alert("Thanks");
        $(this).html("Good Luck!");
      });
    }

    function highlight() {
		$('.landingform-content').delegate('input', 'focus blur', function(){
	    	var elem = $(this);
			elem.closest('.formfields-item-input').toggleClass('focused');
		});
	}

		


