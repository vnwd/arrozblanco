$(document).ready(function() {
  //if device is touch, give them a button, to touch.
  var is_touch_device = 'ontouchstart' in document.documentElement;
  if(is_touch_device) $("<input type='submit' id='search' value='Subscribe me!'>").insertAfter('input[name=EMAIL]').css("width", '10em');
  
  //random placeholder text
  $('input[name=EMAIL]').attr('placeholder',
        placeholderMessages[randomInRange(0, placeholderMessages.length)]);

  $('form').on("submit", function () {
    var $this = $(this);
    //log the email
    //console.log($('input[name=EMAIL]').val());
    //send register
    register($this);
    //prevent refresh
    event.preventDefault();
    return false;
  });
});
//the thank you messages
thankYouMessages = ["Thank You!",
             "¡Ese email 'sta bien brutal, Gracias!",
             "¡Ay dío! Qué largo lo tienes...",
             "Te molesta si te agrego en Tinder?",
             "¡Gracias!"];

//the placeholder messages for the email input
placeholderMessages = ["Emails, mmm, hit enter, mmmmm yes",
            "Ay si papi, dame dame tu correo electronic",
            "Enter Email, Hit Enter, Submit... submit",
            "Fountain: Would you kindly, enter your email and hit return",
            "Pon tu email, y dale enter",
            "Look at this tastefully designed website. Please enter your email into the bar provided and tap the enter key",
            "¡MIRA! PUÑETA SUSCRIBETE! estoy lonely..."];
//this function returns a random integer between min and max
function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
//this function ajax's the email to the list and handles the responce
function register($form) {
  $.ajax({
    type: $form.attr('method'),
    url: $form.attr('action').replace('/post?', '/post-json?').concat('&c=?'),    data: $form.serialize(),
    dataType : 'json',
    contentType : "application/json; charset=utf-8",
    error : function(err) {alert("Sorry, I failed! Try again later...");},
    success: function(data) {
      if (data.result != "success") {
        alert(data.msg);
      } else {
        console.log("success");
        //insert random thank you
        var thankYou = thankYouMessages[randomInRange(0,thankYouMessages.length)];
        $("#thanksMessage").html(thankYou);
        //remove form
        $("form").remove();
      }
    }
  });
}