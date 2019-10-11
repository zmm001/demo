;//函数
function toInt(args) {
    //var $this = $(this);
    var val = parseInt(args[0] == null ? args.currentTarget.value : args[0].value);
    val = isNaN(val) ? 1 : Math.max(1, val);
    args[0] == null ? args.currentTarget.value = val : args.val(val);
}
//数字
$(function () {
    $(".enter-int-input").keyup(function () {
        if ($(this).val() === "") return;
        toInt($(this));
    }).blur(function () {
        toInt($(this))
    }).focus(function () {
        $(this).select();
    });
});
//nav
$(function () {
    var $window = $(window);
    //    var winScroll = 0;
    //    var winHeight = 0;
    var $nav = $(".nav"),
        $headerHeight = $nav.offset().top,
        $div = $("<div>").css("height", $nav.height()).hide();

    $nav.after($div);
    function reset() {
        if ($window.scrollTop() > $headerHeight) { //判断是否滚动到一定位置
            $nav.addClass("headroom");
            $div.show();
        } else {
            $nav.removeClass("headroom");
            $div.hide();
        }
    }
    $window.scroll(reset);
    $window.resize(function () {
        $headerHeight = $nav.offset().top;
        $div.css("height", $nav.height());
        reset();
    });
});
//header-shopping-cart
$(function () {
    var $window = $(window);
    var $body = $("body");
    var $pixel = 992;
    var $spWrapper = $(".header-shopping-wrapper");
    var $spCart = $spWrapper.find(".shopping-cart");
    var isshow = false;
    $spWrapper.hover(function () {
        if ($window.width() >= $pixel) {
            //            if (isshow) {
            $spCart.stop(true).delay(200).slideDown();
            //            } else {
            //                $spCart.stop(true).delay(100).slideUp();
            //            }
            //            isshow = !isshow;
            //            return false;
        }
    }, function () {
        if ($window.width() >= $pixel) {
            $spCart.stop(true).delay(200).slideUp();
        }
    });
    $spCart.click(function (e) {
        e.stopPropagation();
    });
    $body.bind("click touchstart", function () {
        $spCart.hide();
        isshow = false;
    });
    $window.resize(function () {
        if ($window.width() <= $pixel) {
            $spCart.hide();
        }
    });
});
//header-selectors-wrapper
//$(function () {
//    var $body = $("body");
//    var $scSelect = $(".selectors-select");
//    var $scList = $scSelect.find(".selectros-list");
//    var $scAll = $("#selectros-all");
//    $scSelect.click(function () {
//        var _index = $(this).index();
//        if ($scList.eq(_index).css("display") == "none") {
//            $scList.eq(_index).show();
//            $scAll.show();
//        } else {
//            $scList.eq(_index).hide();
//            $scAll.hide();
//        }
//        return false;
//    });
//    $scList.click(function (e) {
//        e.stopPropagation();
//    });
//    $body.click(function () {
//        $scList.hide();
//        $scAll.hide();
//        isshow = false;
//    });
//});
//mini-navigation
$(function () {
    var $window = $(window);
    var $body = $("body");
    var $pixel = 993;
    var $mnMenu = $(".mini-menu");
    var $mnSearch = $(".mini-search");
    var $navExtend = $(".nav-extend");
    var $exSearch = $navExtend.find(".extend-search");
    var $exNavigation = $navExtend.find(".extend-navigation");
    var $iconLeft = $navExtend.find(".icon-left-angle");
    var $iconBack = $navExtend.find(".icon-icon");
    var $iconClose = $navExtend.find(".close-btn");
    var $parentBack = $navExtend.find(".parent-icon");
    var $parentClose = $navExtend.find(".parent-close");
    $mnSearch.click(function () {
        $navExtend.fadeIn();
        $exSearch.slideDown();
        return false;
    });
    $exSearch.click(function (e) {
        //return false;
        e.stopPropagation();
    });
    $mnMenu.click(function () {
        $navExtend.show();
        $exNavigation.show(100);
        $navExtend.find(".extend-navigation-1").animate({ "left": "0" }, 100);
        return false;
    });
    $iconLeft.click(function () {
        var _index = $(this).index();
        $(this).next(".extend-navigation").animate({ "left": "0" }, 100);
    });
    $($parentBack).add($parentClose).click(function () {
        $(this).parent().parent(".extend-navigation").animate({ "left": "-100%" }, 100);
        $navExtend.fadeOut();
    });
    $($iconBack).add($iconClose).click(function () {
        $(this).parent().parent(".extend-navigation").animate({ "left": "-100%" }, 100);
    });
    $exNavigation.click(function (e) {
        e.stopPropagation();
    });
    $body.click(function () {
        $navExtend.fadeOut();
        $exNavigation.animate({ "left": "-100%" }, 100);
        $exSearch.slideUp();
    });
    $window.resize(function () {
        if ($window.width() >= $pixel) {
            $navExtend.hide();
            $exNavigation.hide();
            $exSearch.hide();
        }
    });
});
//pc-navigation
$(function () {
    var $pcNavigation = $(".pc-navigation");
    var $navigationLi = $pcNavigation.find("li");
    $navigationLi.hover(function () {
        $(this).children('.pc-navigation-linkage').stop(true, false).slideDown(250);
    }, function () {
        $(this).children('.pc-navigation-linkage').stop(true, false).delay(50).slideUp(200);
        });
});
//product-toggle
//$(function () {
//    var $window = $(window);
//    var $pixel = 992;
//
//    $("[data-toggle='leftbox']").each(function () {
//        var $productToggle = $(this);
//        var $productIcon = $productToggle.find(".iconfont");
//        var $toggleList = $productToggle.find("ul");
//
//
//        $productToggle.click(function () {
//            $toggleList.stop(true).slideToggle();
//            if ($productIcon.hasClass("icon-jian")) {
//                $productIcon.removeClass("icon-jian").addClass("icon-jia");
//            } else {
//                $productIcon.addClass("icon-jian").removeClass("icon-jia");
//            }
//        });
//        if ($window.width() < $pixel) {
//            $toggleList.hide();
//            $productIcon.addClass("icon-jian").removeClass("icon-jia");
//        } else {
//            $toggleList.show();
//            $productIcon.removeClass("icon-jian").addClass("icon-jia");
//        }
//        $window.resize(function () {
//            if ($window.width() < $pixel) {
//                $toggleList.hide();
//                $productIcon.addClass("icon-jian").removeClass("icon-jia");
//            } else {
//                $toggleList.show();
//                $productIcon.removeClass("icon-jian").addClass("icon-jia");
//            }
//        });
//
//        $toggleList.click(function (e) {
//            e.stopPropagation();
//        });
//
//    });
//
//});

//lazyload
$(function() {
    $("img.lazyload").lazyload();
});

function initCart() {
    var $window = $(window);
    var $pixel = 750;
    var $cartTable = $(".cart-table-inner");
    var $cartTbody = $cartTable.find(".tbody");
    var $tbodyDetail = $cartTbody.find(".cart-detail");
    var $cartAll = $cartTable.find("td").find("*");
    $cartTbody.click(function () {
        console.log(1);
        if ($window.width() <= $pixel) {
            console.log(2);
            $(this).next($tbodyDetail).fadeToggle();

            if ($(this).find(".icon-jian,.icon-jia").hasClass("icon-jian")) {
                $(this).find(".icon-jian,.icon-jia").removeClass("icon-jian").addClass("icon-jia");
            } else {
                $(this).find(".icon-jian,.icon-jia").addClass("icon-jian").removeClass("icon-jia");
            }
        }
    });
    $cartAll.click(function (e) {
        e.stopPropagation();
    });
}
//cart
$(function () {
    initCart();
});

//Android and IOS
$(function () {
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        $("input").css({
            "-webkit-appearance": "none",
            "border-radius": 0
        });
    }
});
//搜索

$(function () {
//    $(".search-inner").click(function () {
//        $(this).closest("form")[0].submit();
//        return;
//    });
    $(".search-inner .iconfont,.newsletter-inner .iconfont").click(function() {
        var $this = $(this);
        $this.parent().find("input").click();
    });
});

//防止出操作 两次单击
//$(function() {
//    $("form input:submit").delayClick();
//});
//回到顶部
$(function () {
    $("body").append("<a id='backTop'><span class='iconfont icon-fanhuidingbu'></span></a>");
    $("#backTop").backTop();
});
//邮件订阅
$(function () {
    var box = $("#newsletter-box");

    function newsletter_subscribe(subscribe) {
        var subscribeProgress = $("#subscribe-loading-progress");
        subscribeProgress.show();
        var postData = {
            subscribe: subscribe,
            email: $("#newsletter-email").val()
        };
        $.ajax({
            cache: false,
            type: "POST",
            url: box.data("url"),
            data: postData,
            success: function (data) {
                subscribeProgress.hide();
                $("#newsletter-result-block").html(data.Result);
                if (data.Success) {
                    box.hide();
                    $('#newsletter-result-block').show();
                } else {
                    $('#newsletter-result-block').fadeIn("slow").delay(2000).fadeOut("slow");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Failed to subscribe.');
                subscribeProgress.hide();
            }
        });
    }

    $('#newsletter-subscribe-button').click(function () {
        if (box.data("allowed")) {
           if ($('#newsletter_subscribe').is(':checked')) {
                newsletter_subscribe('true');
                } else {
                    newsletter_subscribe('false');
                }
        }
        else {
           newsletter_subscribe('true');
        }
    });
    $("#newsletter-email").keydown(function (event) {
        if (event.keyCode === 13) {
            $("#newsletter-subscribe-button").click();
            return false;
        }
    });

});
//微信展开
$(function () {
    // 微信图片默认不展开，点击后展开
    $(".wechat").click(function (e) {
        if ($(".wechat-picture").length > 0) {
            $(".wechat-picture").slideUp(function () {
                $(this).remove();
            });
        } else {
            $(".top-networks")
                .after("<img src='https://cdn.capsulcn.com/Themes/Ipharmachine/Content/img/wechat.png' class='wechat-picture' alt='wechat' />");
            $(".wechat-picture").slideToggle();
            e.stopPropagation();
        }
    });
    $("body,html").click(function() {
        $(".wechat-picture").slideUp(function () {
            $(this).remove();
        });
    });
});

//防止刷新导致的重复提交
$(function() {
    if ($(".no-repost").length > 0) {
        history.replaceState(null, null, window.location.href);
    }
});