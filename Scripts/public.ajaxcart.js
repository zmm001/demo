/*
** nopCommerce ajax cart implementation
*/


var AjaxCart = {
    loadWaiting: false,
    usepopupnotifications: false,
    topcartselector: '',
    topwishlistselector: '',
    flyoutcartselector: '',

    init: function (usepopupnotifications, topcartselector, topwishlistselector, flyoutcartselector) {
        this.loadWaiting = false;
        this.usepopupnotifications = usepopupnotifications;
        this.topcartselector = topcartselector;
        this.topwishlistselector = topwishlistselector;
        this.flyoutcartselector = flyoutcartselector;
    },

    setLoadWaiting: function (display) {
        displayAjaxLoading(display);
        this.loadWaiting = display;
    },
    // 确认对话框
    confirmDialog: function (urladd, productId, callback, isCart) {
        isCart = isCart == null ? "" : "/?updatecartitemid=" + isCart; //  购物车和收藏夹编辑
        if (window.innerWidth > 992) {
            $.ajax({
                cache: false,
                url: '/ShoppingCartCOnfirmation/' + productId + isCart,
                type: 'post',
                success: function (e) {
                    //document.body.style.overflowY = "hidden";
                    var top = $(document).scrollTop();
                    $(document).on('scroll.unable', function (e) {
                        $(document).scrollTop(top);
                    })
                    var script1 = document.createElement('script');
                    var script2 = document.createElement('script');
                    var script3 = document.createElement('script');
                    var script4 = document.createElement('script');
                    var script5 = document.createElement('script');
                    var script6 = document.createElement('div');
                    script6.id = "dialogJs";
                    script1.src = "/Themes/Store/Content/js/pages/productDetails.js";
                    script2.src = "/Themes/Store/Content/js/pages/productDialogDetails.js";
                    script3.src = "/Themes/Store/Content/js/extend/photoswipe.min.js";
                    script4.src = "/Themes/Store/Content/js/extend/swiper.jquery.min.js";
                    script5.src = "/Themes/Store/Content/js/extend/photoswipe-ui-default.js";
                    document.body.appendChild(script6);
                    script6.appendChild(script1)
                    script6.appendChild(script2)
                    script6.appendChild(script3)
                    script6.appendChild(script4)
                    script6.appendChild(script5)
                    document.getElementById("bar-notification").insertAdjacentHTML('afterend', e)
                    var href = document.getElementsByClassName('swiper-wrapper')[0].getElementsByTagName('a');
                    for (var i = 0; i < href.length; i++) {
                        href[i].onclick = function () {
                            return false;
                        }
                    }
                },
                complete: function () { },
                error: this.ajaxFailure
            });
        } // 大屏幕显示弹窗
        else {
            if (callback == 1) {
                this.addproducttocart_catalog(urladd)
            } else {
                this.addproducttocomparelist(urladd)
            }
        }
    },
    // 移除对话框
    removeDialog() {
        //document.body.style.overflowY = "scroll";
        $(document).unbind("scroll.unable");
        if (document.getElementById("contactus_dialog") != null)
            document.getElementById("contactus_dialog").remove();
    },
    //add a product to the cart/wishlist from the catalog pages
    addproducttocart_catalog: function (urladd) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        $.ajax({
            cache: false,
            url: urladd,
            type: 'post',
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    //add a product to the cart/wishlist from the product details page
    addproducttocart_details: function (urladd, formselector) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        $.ajax({
            cache: false,
            url: urladd,
            data: $(formselector).serialize(),
            type: 'post',
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    //add a product to compare list
    addproducttocomparelist: function (urladd) {
        if (this.loadWaiting != false) {
            return;
        }
        this.setLoadWaiting(true);

        $.ajax({
            cache: false,
            url: urladd,
            type: 'post',
            success: this.success_process,
            complete: this.resetLoadWaiting,
            error: this.ajaxFailure
        });
    },

    success_process: function (response) {
        if (response.updatetopcartsectionhtml) {
            $(AjaxCart.topcartselector).html(response.updatetopcartsectionhtml);
        }
        if (response.updatetopwishlistsectionhtml) {
            $(AjaxCart.topwishlistselector).html(response.updatetopwishlistsectionhtml);
        }
        if (response.updateflyoutcartsectionhtml) {
            $(AjaxCart.flyoutcartselector).replaceWith(response.updateflyoutcartsectionhtml);
        }
        if (response.message) {
            //display notification
            if (response.success == true) {
                //success
                if (AjaxCart.usepopupnotifications == true) {
                    displayPopupNotification(response.message, 'success', true);
                }
                else {
                    //specify timeout for success messages
                    displayBarNotification(response.message, 'success', 3500);
                }
                // 执行成功清除弹窗
                AjaxCart.removeDialog();
                window.location.reload()
            }
            else {
                //error
                if (AjaxCart.usepopupnotifications == true) {
                    displayPopupNotification(response.message, 'error', true);
                }
                else {
                    //no timeout for errors
                    displayBarNotification(response.message, 'error', 0);
                }
            }
            return false;
        }
        if (response.redirect) {
            location.href = response.redirect;
            return true;
        }
        return false;
    },

    resetLoadWaiting: function () {
        AjaxCart.setLoadWaiting(false);
    },

    ajaxFailure: function () {
        alert('Failed to add the product. Please refresh the page and try one more time.');
    }
};