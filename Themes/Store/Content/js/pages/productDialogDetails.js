$(function () {
    $(".pop-box .close").click(function () {
        AjaxCart.removeDialog();
        $("#dialogJs").remove();
    });
    $(".hide-dialog").click(function () {
        var $this = $(this);
        if (!$this.is(".disabled")) {
            AjaxCart.addproducttocart_details($this.data("url"), '#product-details-form');
        }
        return false;
    });
    document.onclick = function (event) {
        var event = event || window.event;
        var targetId = event.target ? event.target.id : event.srcElement.id;
        if (targetId == "contactus_dialog") {
            AjaxCart.removeDialog();
            $("#dialogJs").remove();
        }
    }
});
