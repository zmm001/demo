
$(function () {
    var cartQty = $(".cart-sum input,.cart-sum select"),
        removeTitle = $("#remove-title"),
        deleteTitle = removeTitle.data("title"),
        deleteMessage = removeTitle.data("message"),
        ok = removeTitle.data("ok"),
        cancel = removeTitle.data("cancel"),
        deleteBtn = $(".delete-btn"),
        addBtn = $(".addcart-btn"),
        deleteMobBtn = $(".delete-mob-btn"),
        addMobBtn = $(".add-mob-btn"),
        updateBtn = $("#updatecart"),
        addtoCartButton = $("#addtocartbutton");
    //数量选择
    cartQty.change(function () {
        updateBtn.click();
    });
    //删除
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
    deleteMobBtn.click(function () {
        $("#del-btn-" + $(this).data("id")).click();
    });
    //加入购物车
    addBtn.click(function () {
        var $this = $(this);
        $this.siblings(".add-input").prop("checked", true);
        addtoCartButton.click();
    });
    addMobBtn.click(function () {
        $("#add-btn-" + $(this).data("id")).click();
    });

});
