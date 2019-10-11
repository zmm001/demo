$(function(){
	//submit
	var $submit = $("#submit");
	$submit.click(function(){
		if(!$OldPassword.val() || $checkOldPassWord.html()){
			$OldPassword.addClass("border-error");
		}
		if(!$PassWord.val() || $checkPassWord.html()){
			$PassWord.addClass("border-error");
		}
		if(!$ConfirmPassowrd.val() || $checkConfirmPassWord.html()){
			$ConfirmPassowrd.addClass("border-error");
		}		
		else{
			alert("成功");
		}
	});
})
