//div resize 监控器 listeningObject=box|all|position
; (function ($) {
    "use strict";
    var notEqual = function (a, b) {
        if (a === b) return false;
        if (Math.abs(a - b) < 1) return false;
        return true;
    };
    var option = { "listeningObject": "size", "timmer": 500 };
    $.fn.boxListening = function (fn, opt) {
        opt = $.extend(option, opt);
        return $(this).each(function () {
            var $this = $(this), h, w, t, l;
            switch (option.listeningObject.toLowerCase()) {
                case "size":
                    setInterval(function () {
                        var rect = $this[0].getBoundingClientRect(), nh = rect.height, nw = rect.width;
                        if (notEqual(h, nh) || notEqual(w, nw)) {
                            //console.log(`w:${w},h:${h},nw:${nw},nh:${nh}`);

                            fn(w = nw, h = nh);
                        }
                    }, opt.timmer);
                    break;
                case "position":
                    setInterval(function () {
                        var offset = $this.offset(), nt = offset.top, nl = offset.left;
                        if (notEqual(l, nl) || notEqual(t, nt)) {
                            //console.log(`t:${t},l:${l},nt:${nt},nl:${nl}`);

                            fn(t = nt, l = nl);
                        }
                    }, opt.timmer);
                    break;
                default: //all
                    setInterval(function () {
                        var rect = $this[0].getBoundingClientRect(), nh = rect.height, nw = rect.width, offset = $this.offset(), nt = offset.top, nl = offset.left;

                        if (notEqual(h, nh) || notEqual(w, nw) || notEqual(l, nl) || notEqual(t, nt)) {
                            //console.log(`w:${w},h:${h},t:${t},l:${l},nw:${nw},nh:${nh},nt:${nt},nl:${nl}`);
                            fn(w = nw, h = nh, t = nt, l = nl);

                        }
                    }, opt.timmer);
                    break;
            }

        });
    };
})(jQuery);

//强制要求被固定的元素,
(function ($) {
    "use strict";
    var option = { "minWidth": 992, "marginTop": 0, "topContent": "html" }; //浏览器最小宽度, 留空的距离, position related的父本的选择器
    var equal = function (a, b) {
        if (a === b) return true;
        if (Math.abs(a - b) < 1) return true;
        return false;
    };
    function init($orginal, $placeholder) {
        $orginal.add($placeholder).attr("style", "");
        $placeholder.hide();
    }
    function setPlaceholder($placeholder, box) {
        $placeholder.css({
            //"background": "#f60",
            "float": box.float,
            "marginLeft": box.marginLeft,
            "marginTop": box.marginTop,
            "marginRight": box.marginRight,
            "width": Math.floor(box.width - 1),
            "height": box.height,
            "marginBottom": box.marginBottom
        }).show();
    }
    function getBoxsize($o, $placeholder) {
        init($o, $placeholder);
        var box = {};
        var offset = $o.offset();
        var rect = $o[0].getBoundingClientRect();
        box.width = rect.width;
        box.height = rect.height;
        box.top = offset.top;
        box.left = offset.left;
        box.display = $o.css("display");
        box.marginLeft = parseFloat($o.css("margin-left"));
        box.marginTop = parseFloat($o.css("margin-top"));
        box.marginRight = parseFloat($o.css("margin-right"));
        box.marginBottom = parseFloat($o.css("margin-bottom"));
        //box.paddingLeft = parseFloat($o.css("padding-left"));
        //box.paddingTop = parseFloat($o.css("padding-top"));
        //box.paddingRight = parseFloat($o.css("padding-right"));
        //box.paddingBottom = parseFloat($o.css("padding-bottom"));
        //box.borderLeft = parseFloat($o.css("border-left-width"));
        //box.borderTop = parseFloat($o.css("border-top-width"));
        //box.borderRight = parseFloat($o.css("border-right-width"));
        //box.borderBottom = parseFloat($o.css("border-bottom-width"));
        box.float = $o.css("float");
        //box.width = box.width + box.borderLeft + box.borderRight + box.paddingLeft + box.paddingRight;
        //box.height = box.height + box.borderTop + box.borderBottom + box.paddingTop + box.paddingBottom;

        return box;
    }

    function toAbsolute(box, $orginal, top, $topContent) {
        var l = box.left;
        var t = top;
        if ($topContent.length > 0) {
            var topOffset = $topContent.offset();
            l -= topOffset.left;
            t -= topOffset.top;
        }
        $orginal.css({
            "left": l,
            "top": t,
            "width": Math.floor(box.width),
            "position": "absolute"
        });
    }
    function toFixed(box, $orginal, top) {
        $orginal.css({
            "left": box.left,
            "top": top,
            "width": Math.floor(box.width),
            "position": "fixed"
        });

    }
    $.fn.fixing = function (arg) {
        arg = $.extend(option, arg);
        var thisName = "fixing" + Math.ceil(Math.random() * 1000);
        //console.log(thisName);
        return $(this).each(function () {
            var $orginal = $(this),
                $parent = $orginal.parent(),
                $window = $(window),
                $topContent = $(arg.topContent).eq(0),
                $placeholder = $("<div>").addClass("fixing-placeholder"),
                box,
                parentHeight,
                windowHeight,
                absTop = 0;
            function reset() {
                box = getBoxsize($orginal, $placeholder);
                parentHeight = $parent[0].getBoundingClientRect().height;
                windowHeight = $window.height();
                setPlaceholder($placeholder, box);
                $window.unbind("scroll." + thisName);
                if (box.display === "none" || $window.width() <= arg.minWidth) {
                    init($orginal, $placeholder);
                    return;
                }
                setPosition();
                //$window.scroll(setPosition);
                $window.bind("scroll." + thisName, setPosition);
            }
            function setPosition() {
                //console.log(1);
                if (box.display === "none" || $window.width() <= arg.minWidth) return;
                var scrollTop = $window.scrollTop();
                absTop = Math.max(absTop, windowHeight - box.height - box.marginTop - box.marginBottom + scrollTop);//  相对屏幕下边不空
                absTop = Math.min(absTop, scrollTop + arg.marginTop);//相对于屏幕上边不不空
                absTop = Math.max(absTop, box.top - box.marginTop);//上边不超过父元素
                absTop = Math.min(absTop, parentHeight - box.height - box.marginTop - box.marginBottom + box.top);//  下边不超过父元素

                var fixedTop = absTop - scrollTop;
                if (equal(fixedTop, arg.marginTop) || equal(fixedTop, windowHeight - box.height - box.marginTop - box.marginBottom))
                    toFixed(box, $orginal, fixedTop);
                else
                    toAbsolute(box, $orginal, absTop, $topContent);
            }
            $orginal.after($placeholder);
            reset();
            //事件

            $window.resize(reset);
            $orginal.boxListening(reset);
            $parent.boxListening(reset, { listeningObject: "all" });
        });
    };
})(jQuery);

$(function () {
    $("[data-toggle='fixing']").each(function () {
        var $this = $(this);
        //        console.log($this);
        $this.fixing($this.data("fixing"));
    });
});