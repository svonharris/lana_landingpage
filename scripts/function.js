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
	    $('input').focus(function(){
	    	if ($(this).is(':focus')) {
	    		$('.formfields-item-input').css('border', '2px solid black');
		    } else {
		    	$('.formfields-item-input').css('border', '0');
		    }
	    });
	}
