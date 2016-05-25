/*
Quirks
   - won't allow one letter to pass as a name(bad?)
   - current name accepts all symbols
*/

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
    // console.log(signUpForm);
    $.ajax({
      type: 'post',
      url: 'server.rb',
      data: 'signUpForm',
      dataType: 'json'
    }).done(function(msg) {
      // console.log(msg);
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
          shit(pn,inputs[i],"Must have 10 digits",n,v);    
          break;
        
        case "fname":
          var bn = birthName(v);
          shit(bn,inputs[i],"Alphabetical characters only",n,v); 
          break;
        
        case "lname":
          var bn = birthName(v);
          shit(bn,inputs[i],"Alphabetical characters only",n,v);
          break;
        
        case "email":
          var eaddy = emailAddres(v);
          shit(eaddy,inputs[i],"Email is incorrect",n,v);
          break;
        
        case "birthdate":
          var bday = birthDate(v);
          shit(bday,inputs[i],"MM/DD/YYYY format",n,v);
          break; 

        default:
          console.log(v + " is undefined");
          return;
      }
    }

    function shit(patternval,inputnum,text,name,value) {
      if (patternval === false) {
        correctInputs.push("false");
        errorMsg(inputnum, text);
      } else {
        customer[name] = value;
        successMsg(inputnum, "");
      }
    }

    if (correctInputs.indexOf('false') === -1) {
      return customer;
    }
  }






    function errorMsg(field, msg) {
      field.parent().next('.js-errormsg').html(msg).css('display', 'block');
      errorClass(field);
    }
    function successMsg(field, msg) {
      field.parent().next('.js-errormsg').html(msg).css('display', 'none');
      correctClass(field);
    }
    function phoneNumber(phone) {
      if (phone === null || phone === "") {
        return true;
      } else {
        var regex = /^\d{10}$/;
        if (!regex.test(phone)) {
          return false;
        }
      }
    }
    function emailAddres(email) {
      var regex = /^[\w\.\-\_\+]+@[\w-]+\.\w{2,4}$/;
      if (!regex.test(email)) {
        return false;
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
    function birthDate(bday) {
      var regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!regex.test(bday)) {
        return false;
      }
    }



