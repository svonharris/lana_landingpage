$(document).ready(function() {
    fade();
});

function fade() { //fade content & backgroud image in slowly
	$('.js-container').fadeIn(1000, function() {
	  $('.js-bckgrdlana').fadeIn(1000);
	});
}

$('#js-submit').click(function(e) {
	e.preventDefault(); 
	var signUpForm = verification($('#signup'));
	$.ajax({
	  url: '/signup',
	  type: 'POST',
	  data: {signup_form: JSON.stringify(signUpForm)}
	}).done(function(msg) {
	  // $('body').html(msg);
	  console.log(msg);
	  //if (msg === '304') {console.log("success");}
	});
});
