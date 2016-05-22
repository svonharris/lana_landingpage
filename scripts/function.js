
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
        disable()
      } else {
        correctClass(input);
      }
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
    var btn = $(this);
    buttonActive(btn);    
    signUpForm($('#signup'));
    // alert("Thanks");
    // e.preventDefault(msg, function() {
    //   if (msg === success) {
    //     alert("Thanks");
    //     $('.button--submit').html("Good Luck!");
    //   } else {
    //     alert("submit failed");
    //   }
    // });
  });

  function buttonActive(btn) {
    btn.addClass('active');
    btn.blur(function() {
      btn.removeClass('active');
    });
  }

  function signUpForm(form) {
    var inputs = [];
    $(form).find('input').each(function() {
      inputs.push($(this));
    }); 
    //console.log(inputs.length); 
    verify(inputs);
  }

  function verify(inputsArr) {
    for (var i=0; i<inputsArr.length; i++) {
      var n = inputsArr[i].attr('name');
      var v = inputsArr[i].val();    
      switch(n) {
        case "phone":
          var pn = phoneNumber(v);
          if (pn === false) {
            errorClass(inputsArr[i]);
            console.log("phone number must have 10 digits");
          }
          break;
        
        case "fname":
          var bn = birthName(v);
          if (bn === false) {
            errorClass(inputsArr[i]);
            console.log("Name must be alphabetic characters only");
          }
          break;
        
        case "lname":
          var bn = birthName(v);
          if (bn === false) {
            errorClass(inputsArr[i]);
            console.log("Name must be alphabetic characters only");
          }
          break;
        
        case "email":
          var eaddy = emailAddres(v);
          if (eaddy === false) {
            errorClass(inputsArr[i]);
            console.log("email is incorrect");
          }
          break;
        
        case "birthdate":
          var bday = birthDate(v);
          if (bday === false) {
            errorClass(inputsArr[i]);
            console.log("Birthdate must be MM/DD/YYYY");
          }
          break; 
        
        default:
          console.log(v + " is undefined");
          return;
      }
    }
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
    var regex = /^[a-zA-Z]+\w[\w\-\ ]+[a-zA-Z]+$/;
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





/*
<form action="#" method="post" id="myform" name="myform">

  
  <label for="fullname" class="item">Full Name*</label>
  <input class="put" type="text" id="fullname" name="name" autocomplete="name" required/>
  <div class="none">error</div><br><br>

  
  <label for="email" class="item">Email Address*</label>
  <input class="put" type="email" id="email" name="email" autocomplete="email" required/><br><br>

  
  <label for="phone" class="item">Phone Number</label>
  <input class="put" type="tel" id="phone" name="phone" autocomplete="tel" pattern="[0-9]" maxlength="10" size="10" /><br><br>

  
  <div class="formsubmit">
    <button type="submit" class="disabled btn" id="submit">submit</button>
    <button type="reset">reset</button>
  </div>
  
</form>
*/


/*
$(document).ready(function() {
    highlight();
  
});


function highlight() {
  $(':input').focus(function() {
    var input = $(this);
    input.addClass('focused');
    input.blur(function() {
      input.removeClass('focused');
      required(input);
    });
  });
}   

function required(input) {
  if (input.prop('required')) {
    var v = input.val();
    if (v === null || v === "") {
      //console.log("field empty");
      errorClass(input);
    } else {      
      correctClass(input);
      //field is not empty but does it make sense??
    }
  }
}




function errorClass(element) {
  $(element).addClass('error');
  $('#submit').addClass('disabled');
}

function correctClass(element) {
 $(element).removeClass('error');
  var n = $('input').hasClass('error');
  if (!n) {
    $('#submit').removeClass('disabled');
  }

}





$('#submit').click(function(e) {
  e.preventDefault();
  submitForm($('#myform'));
});

function submitForm(form) {
  var inputs = [];
  $(form).find('input').each(function() {
    inputs.push($(this));
  }); 
  //console.log(inputs.length); 
  verify(inputs);
}

function verify(inputsArr) {
  for (var i=0; i<inputsArr.length; i++) {
    var n = inputsArr[i].attr('name');
    var v = inputsArr[i].val();    
    switch(n) {
      case "phone":
        console.log(v + " is a phone number");
        //phoneNumber(v);
        phoneNumber(inputsArr[i]);
        break;
      case "name":
        console.log(v + " is a name");
        break;
      case "email":
        console.log(v + " is an email");
        break;
      case "birthdate":
        console.log(v + " is a birthdate");
        break; 
      default:
        console.log(v + " is undefined");
        return;
    }
  }
  var k = $('input').hasClass('error');
  if (!k) {
    alert("submit form");
  }
}

function phoneNumber(phoneVal) {
  if (/\D/g.test(phoneVal.val())) {
    console.log("incorrect entry");
    errorClass(phoneVal);
  } else if (phoneVal.length !== 10) {
    console.log("must have 10 digits");
  }
}

*/