//$(function(){
//	var $tbody = $(".tbody");
//	var $deleteBtn = $(".delete-btn");
//	$deleteBtn.click(function(){
//		swal({
//		  title: "Are you sure?",
//		  text: "You will not be able to recover this imaginary file!",
//		  type: "warning",
//		  showCancelButton: true,
//		  confirmButtonColor: "#DD6B55",
//		  confirmButtonText: "Yes, delete it!",
//		  closeOnConfirm: false
//		},
//		function(){
//		  swal("Deleted!", "Your imaginary file has been deleted.", "success");
//		});
//	});
//});
//$(function(){
//	var $window = $(window);
//	var $pixel = 750;
//	var $cartTable = $(".cart-table-inner");
//	var $cartTbody = $cartTable.find(".tbody");;
//	var $cartNumber = $cartTable.find(".iconfont");
//	var $tbodyDetail = $cartTbody.find(".cart-detail");
//	var $cartAll = $cartTable.find("td").find("*");
//	$cartTbody.click(function(){
//		if($window.width()<=$pixel){
//			$(this).next($tbodyDetail).fadeToggle();
//			if($(this).find(".iconfont").hasClass("icon-jian")){
//  		  $(this).find(".iconfont").removeClass("icon-jian").addClass("icon-jia");
//  	  }else{
//  		  $(this).find(".iconfont").addClass("icon-jian").removeClass("icon-jia");
//  	  }
//		}
//	});
//	$cartAll.click(function(){
//		return false;
//	});
//});

$(function () {
    var cartQty = $(".cart-sum input,.cart-sum select"),
        removeTitle = $("#remove-title"),
        deleteTitle = removeTitle.data("title"),
        deleteMessage = removeTitle.data("message"),
        ok = removeTitle.data("ok"),
        cancel = removeTitle.data("cancel"),
        deleteBtn = $(".delete-btn"),
        deleteMobBtn = $(".delete-mob-btn"),
        updateBtn = $("#updatecart");

    cartQty.change(function () {
        updateBtn.click();
    });
    deleteBtn.click(function () {
        var $this = $(this);
        swal({
            title: deleteTitle,
            text: deleteMessage,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: ok,
            cancelButtonText: cancel,
            closeOnConfirm: false
        },
            function () {
                $this.siblings(".del-input").prop("checked", true);
                updateBtn.click();
            });
    });
    deleteMobBtn.click(function() {
        $("#del-btn-" + $(this).data("id")).click();
    });

});

//¿ìµÝ¼ÆËã
$(function () {
    var btn = $('#estimate-shipping-button');
    btn.click(function () {
        displayAjaxLoading(true);
        var select = $("#CountryId");
        if (select.val() === "0") {
            select.css("border-color", "#ec3c00");
            displayAjaxLoading();
            return;
        } else {
            select.attr("style", "");
        }
        $.ajax({
            cache: false,
            type: "POST",
            url: btn.data("url"),
            data: $("#shopping-cart-form").serialize(),
            success: function (data) {
                displayAjaxLoading();
                $('#estimate-shipping-result').html(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                displayAjaxLoading();
                alert('Failed to retrieve estimate shipping.');
            }
        });
    });

    $("#ZipPostalCode").keydown(function (event) {
        if (event.keyCode === 13) {
            $("#estimate-shipping-button").click();
        }
    });
    var readTerms = $("#read-terms");

    readTerms.click(function() {
        displayPopupContentFromUrl(readTerms.data("url"),
            readTerms.data("title"));
    });
    $("#checkout").click(function () {
        var termsofservice = $("#termsofservice");
        if (termsofservice.length > 0 && !termsofservice.prop("checked")) {
            readTerms.click();
            return false;
        }

    });
});
