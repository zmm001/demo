$(function(){
	var $window = $(window);
	var $pixel = 750;
	var $orderTable = $(".order-table-inner");
	var $orderTbody = $orderTable.find(".tbody");;
	var $orderNumber = $orderTable.find(".iconfont");
	var $tbodyDetail = $orderTbody.find(".order-detail");
	var $orderAll = $orderTable.find("td").find("*");
	$orderTbody.click(function(){
		if($window.width()<=$pixel){
			$(this).next($tbodyDetail).fadeToggle();
			if($(this).find(".iconfont").hasClass("icon-jian")){
  		  $(this).find(".iconfont").removeClass("icon-jian").addClass("icon-jia");
  	  }else{
  		  $(this).find(".iconfont").addClass("icon-jian").removeClass("icon-jia");
  	  }
		}
	});
	$orderAll.click(function(){
		return false;
	});
});
