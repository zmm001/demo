$(function(){
	//submit
	var $submit = $("#submit");
	$submit.click(function(){
		if(!$YourName.val() || $checkYourName.html()){
			$YourName.addClass("border-error");
		}
		if(!$YourEmail.val() || $checkYourEmail.html()){
			$YourEmail.addClass("border-error");
		}
		if(!$Enquiry.val() || $checkEnquiry.html()){
			$Enquiry.addClass("border-error");
		}
		else{
			alert("成功");
		}
	});
})
