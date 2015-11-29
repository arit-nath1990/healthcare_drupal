(function($){Drupal.behaviors.password={attach:function(context,settings){var translate=settings.password;$("input.password-field",context).once("password",function(){var passwordInput=$(this);var innerWrapper=$(this).parent();var outerWrapper=$(this).parent().parent();innerWrapper.addClass("password-parent");$("input.password-confirm",outerWrapper).parent().prepend('<div class="password-confirm">'+translate["confirmTitle"]+" <span></span></div>").addClass("confirm-parent");var confirmInput=$("input.password-confirm",outerWrapper);var confirmResult=$("div.password-confirm",outerWrapper);var confirmChild=$("span",confirmResult);var passwordMeter='<div class="password-strength"><div class="password-strength-text" aria-live="assertive"></div><div class="password-strength-title">'+translate["strengthTitle"]+'</div><div class="password-indicator"><div class="indicator"></div></div></div>';$(confirmInput).parent().after('<div class="password-suggestions description"></div>');$(innerWrapper).prepend(passwordMeter);var passwordDescription=$("div.password-suggestions",outerWrapper).hide();var passwordCheck=function(){var result=Drupal.evaluatePasswordStrength(passwordInput.val(),settings.password);if(passwordDescription.html()!=result.message){passwordDescription.html(result.message)}if(result.strength==100){passwordDescription.hide()}else{passwordDescription.show()}$(innerWrapper).find(".indicator").css("width",result.strength+"%");$(innerWrapper).find(".password-strength-text").html(result.indicatorText);passwordCheckMatch()};var passwordCheckMatch=function(){if(confirmInput.val()){var success=passwordInput.val()===confirmInput.val();confirmResult.css({visibility:"visible"});if(this.confirmClass){confirmChild.removeClass(this.confirmClass)}var confirmClass=success?"ok":"error";confirmChild.html(translate["confirm"+(success?"Success":"Failure")]).addClass(confirmClass);this.confirmClass=confirmClass}else{confirmResult.css({visibility:"hidden"})}};passwordInput.keyup(passwordCheck).focus(passwordCheck).blur(passwordCheck);confirmInput.keyup(passwordCheckMatch).blur(passwordCheckMatch)})}};Drupal.evaluatePasswordStrength=function(password,translate){var weaknesses=0,strength=100,msg=[];var hasLowercase=/[a-z]+/.test(password);var hasUppercase=/[A-Z]+/.test(password);var hasNumbers=/[0-9]+/.test(password);var hasPunctuation=/[^a-zA-Z0-9]+/.test(password);var usernameBox=$("input.username");var username=usernameBox.length>0?usernameBox.val():translate.username;if(password.length<6){msg.push(translate.tooShort);strength-=(6-password.length)*5+30}if(!hasLowercase){msg.push(translate.addLowerCase);weaknesses++}if(!hasUppercase){msg.push(translate.addUpperCase);weaknesses++}if(!hasNumbers){msg.push(translate.addNumbers);weaknesses++}if(!hasPunctuation){msg.push(translate.addPunctuation);weaknesses++}switch(weaknesses){case 1:strength-=12.5;break;case 2:strength-=25;break;case 3:strength-=40;break;case 4:strength-=40;break}if(password!==""&&password.toLowerCase()===username.toLowerCase()){msg.push(translate.sameAsUsername);strength=5}if(strength<60){indicatorText=translate.weak}else if(strength<70){indicatorText=translate.fair}else if(strength<80){indicatorText=translate.good}else if(strength<=100){indicatorText=translate.strong}msg=translate.hasWeaknesses+"<ul><li>"+msg.join("</li><li>")+"</li></ul>";return{strength:strength,message:msg,indicatorText:indicatorText}};Drupal.behaviors.fieldUserRegistration={attach:function(context,settings){var $checkbox=$("form#field-ui-field-edit-form input#edit-instance-settings-user-register-form");if($checkbox.length){$("input#edit-instance-required",context).once("user-register-form-checkbox",function(){$(this).bind("change",function(e){if($(this).attr("checked")){$checkbox.attr("checked",true)}})})}}}})(jQuery);