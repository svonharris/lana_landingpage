
$(document).ready(function() {
    fade();
    highlight();
});

  function fade() { //fade content & backgroud image in slowly
    $('.js-container').fadeIn(1000, function() {
      $('.js-bckgrdlana').fadeIn(1000);
    });
  }

  function highlight() { //outlines input field when focus and removes once unfocused(blur)
    $(':input').focus(function() {
      var field = $(this);
      field.parent().addClass('focused');
      field.blur(function() {
        field.parent().removeClass('focused');
        required(field);
      });
    });
  }

  function required(input) { //varifies if input is required & is not empty
    if (input.prop('required')) {
      var n = input.val();
      if (n === null || n === "") {
        //console.log("field empty");
        errorClass(input);
      } else {
        //console.log("field filled out");
        correctClass(input);
      }
    } else {
      console.log("NR");
    }
  }

  function errorClass(element) {
    $(element).parent().addClass('error');
  }

  function correctClass(element) {
    $(element).parent().removeClass('error');
  }




  $('#js-submit').click(function(e) {
    e.preventDefault();
    alert("Thanks");
    // e.preventDefault(msg, function() {
    //   if (msg === success) {
    //     alert("Thanks");
    //     $('.button--submit').html("Good Luck!");
    //   } else {
    //     alert("submit failed");
    //   }
    // });
  });
  $('#js-submit').keypress(function(e) {
    if (event.which == 13) {
      $(this).addClass('active');
      $(this).blur(function() {
        $(this).removeClass('active');
      });
    }
  });


		



