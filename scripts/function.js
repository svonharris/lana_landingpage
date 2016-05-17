
$(document).ready(function() {
    fade();
    highlight();
    submit(); 
});
    
    function submit() {
      $('.button--submit').click(function(e){
        e.preventDefault();
        alert("Thanks");
        $('.button--submit').html("Good Luck!");
      });
    }

    function highlight() {
      $(':input').focus(function() {
        var field = $(this);
        field.parent().addClass('focused');
        field.blur(function() {
          field.parent().removeClass('focused');
        });

        // $(':button').focus(function() {
        //   var bttn = $(':button');
        //   field.parent().css('outline', '0');
        //   bttn.addClass('focused');
        // });
      });

      
	}

		
  function fade() {
    $('.js-container').fadeIn(1000, function() {
      $('.js-bckgrdlana').fadeIn(1000);
    });
  }

