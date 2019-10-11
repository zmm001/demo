$(function(){
	//submit
	var $submit = $("#submit");
	$submit.click(function(){
		if(!$PassWord.val() || $checkPassWord.html()){
			$PassWord.addClass("border-error");
		}
		else if(!$ConfirmPassowrd.val() || $checkConfirmPassWord.html()){
			$ConfirmPassowrd.addClass("border-error");
		}
		else{
			alert("成功");
		}
	});
})
