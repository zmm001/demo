$(function(){
	//submit
	var $submit = $("#submit");
	$submit.click(function(){
		if(!$FirstName.val() || $checkFirstName.html()){
			$FirstName.addClass("border-error");
		}
		else if(!$LastName.val() || $checkLastName.html()){
			$LastName.addClass("border-error");
		}
		else if(!$Email.val() || $checkEmail.html()){
			$Email.addClass("border-error");
		}
		else{
			alert("成功");
		}
	});
});
$(function(){
	$("#date").selectDate();
});
