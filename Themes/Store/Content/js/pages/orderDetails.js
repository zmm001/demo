//$(function(){
//	//submit
//	var $submit = $("#submit");
//	$submit.click(function(){
//		if(!$FirstName.val() || $checkFirstName.html()){
//			$FirstName.addClass("border-error");
//		}
//		else if(!$LastName.val() || $checkLastName.html()){
//			$LastName.addClass("border-error");
//		}
//		else if(!$Email.val() || $checkEmail.html()){
//			$Email.addClass("border-error");
//		}
//		else if(!$City.val() || $checkCity.html()){
//			$City.addClass("border-error");
//		}
//		else if(!$postalCode.val() || $checkPostalCode.html()){
//			$postalCode.addClass("border-error");
//		}
//		else if(!$postalCode.val() || $checkPostalCode.html()){
//			$postalCode.addClass("border-error");
//		}		
//		else if(!$PhoneNumber.val() || $checkPhoneNumber.html()){
//			$PhoneNumber.addClass("border-error");
//		}
//		else{
//			alert("成功");
//		}
//	});
//});
$(function(){
	var $billingSelect = $("#billing-address-select");
	var $billingAddress = $(".new-billing-address");
	$billingSelect.change(function(){
			//console.log($billingSelect.find("option:selected").text());
		if($billingSelect.find("option:selected").text()=="New Address"){
			$billingAddress.show();
		}else{
			$billingAddress.hide();
		}
	});
});
