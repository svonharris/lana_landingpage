/*
Quirks
   - won't allow one letter to pass as a name(bad?)
   - current name accepts all symbols
  - replace POST url
*/

$(document).ready(function() {
	gone();
    fade();
    highlight();
    disable();
    // $('#signup').attr('action', "/signup_js")
});

	function gone() {
		$('.js-container').css('display', 'none');
	    $('.js-bckgrdlana').css('display', 'none');
	}

	function fade() { //fade content & backgroud image in slowly
		$('.js-container').fadeIn(1000, function() {
		  $('.js-bckgrdlana').fadeIn(1000);
		});
	}

	function highlight() { //outlines input field when focus and removes once unfocused(blur)
		$(':input').focus(function() {
			var field = $(this);
			if (field.is(':button')) {
		        field.addClass('focused');
		        field.blur(function() {
	          		field.removeClass('focused');
	        	});
      		} else {
		        field.parent().addClass('focused');
		        field.blur(function() {
          			field.parent().removeClass('focused');
          			required(field);
        		});
      		}
    	});
	}

	function required(input) { //varifies if input is required & is not empty
		if (input.prop('required')) {
			var n = input.val();
			if (n === null || n === "") {
				errorClass(input);
				disable();
	      	} else {
				correctClass(input);
			}
	    } else {
			correctClass(input);
	    }
	}

  function disable() {
    $('#js-submit').addClass('disabled');
  }

  function errorClass(element) {
    $(element).parent().addClass('error');
  }

  function correctClass(element) {
    $(element).parent().removeClass('error');
    var n = $('.js-input').hasClass('error');
    if (!n) {
      $('#js-submit').removeClass('disabled');
    }
  }




  $('#js-submit').click(function(e) {
    e.preventDefault();
    buttonActive($(this));    
    var signUpForm = verification($('#signup'));
    $.ajax({
      url: '/signup_js',
      type: 'POST',
      data: {signup_form: JSON.stringify(signUpForm)}
    }).done(function(msg) {
      // $('body').html(msg);
      console.log(msg);
      //if (msg === '304') {console.log("success");}
    });
  });


  function buttonActive(btn) {
    btn.addClass('active');
    btn.blur(function() {
      btn.removeClass('active');
    });
  }



  function verification(form) {
    var inputs = [];
    $(form).find('input').each(function() {
      inputs.push($(this));
    });

    var customer = {};
    for (var i=0; i<inputs.length; i++) {
      var n = inputs[i].attr('name');
      var v = inputs[i].val();
      var correctInputs = [];
      switch(n) {
        case "phone":
          var pn = phoneNumber(v);
          message(pn,inputs[i],"Must have 10 digits",n,v);    
          break;
        
        case "fname":
          var bn = birthName(v);
          message(bn,inputs[i],"Alphabetical characters only",n,v); 
          break;
        
        case "lname":
          var bn = birthName(v);
          message(bn,inputs[i],"Alphabetical characters only",n,v);
          break;
        
        case "email":
          var eaddy = emailAddres(v);
          message(eaddy,inputs[i],"Email is incorrect",n,v);
          break;

        default:
          return false;
          return;
      }
    }

    function message(patternval,inputnum,text,name,value) {
      if (patternval === false) {
        correctInputs.push("false");
        errorMsg(inputnum, text);
      } else if (patternval === true) {
        customer[name] = value;
        successMsg(inputnum, "");
      }
    }

    if (correctInputs.indexOf('false') === -1) {
      return customer;
    }
  }






    function errorMsg(field, msg) {
      field.parent().next('.js-errormsg').html(msg);
      errorClass(field);
    }
    function successMsg(field, msg) {
      field.parent().next('.js-errormsg').html(msg);
      correctClass(field);
    }
    function phoneNumber(phone) {
      if (phone === null || phone === "") {
        return undefined;
      } else {
        var regex = /^\d{10}$/;
        if (regex.test(phone) === false) {
          return false;
        } else {
          return true;
        }
      }
    }
    function emailAddres(email) {
      var regex = /^[\w\.\-\_\+]+@[\w-]+\.\w{2,4}$/;
      if (regex.test(email) === false) {
        return false;
      } else {
        return true;
      }
    }
    function birthName(name) {
      // var regex = /^([a-zA-Z]+\w[\w\-\ ]+[a-zA-Z]$){0,}/;
      // var regex = /((^[a-zA-Z])+[\w\-\ ]+([a-zA-Z]$)){0,}/;
      var regex = /(^([a-zA-Z]*))+\w[\w\-\ ]/;
      if (regex.test(name)) {
        var regex = /[0-9]/;
        if (regex.test(name)) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }



