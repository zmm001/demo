//swiper1
$(function () {
    var $bigPicture = $(".big-picture");
    var $smallPicture = $(".small-picture"); //底部轮播图
    var $smailSlide = $smallPicture.find(".swiper-slide"); //底部轮播图
    var $rightBigPicture = $("#big-box");//右侧大图 
    function smailHover($this) {
        var _index = $this.index();
        var _smallHref = $this.find("img").attr("data-spic");
        var _bigHref = $this.find("img").attr("data-bpic");
        $this.addClass("swiper-slide-hover").siblings().removeClass("swiper-slide-hover");
        $bigPicture.find("img").attr(
            "src", _smallHref
        );
        $bigPicture.find("img").attr("referen", _index);
        $rightBigPicture.find("img").attr(
            "src", _bigHref
        );
    }
    $smailSlide.hover(function () {
        smailHover($(this));
    });

    $smailSlide.data("hover", smailHover);
    //响应式替换
    function responseRepeat() {
        for (var i = 0; i < $smailSlide.length; i++) {
            $smailSlide.eq(i).find("img").attr("src", $smailSlide.eq(i).find("img").attr("data-bpic"));
        }
    }
    var $window = $(window);
    var $pixel = 992;
    if ($window.width() < $pixel) {
        responseRepeat();
    }
    $window.resize(function () {
        if ($window.width() < $pixel) {
            responseRepeat();
        }
    });
});

//swiper2
$(function () {
    var exports = new Swiper('.small-picture', {
        slidesPerView: 4.2,
        spaceBetween: 5,
        autoplay: 3000,
        pagination: '.swiper-pagination',
        paginationType: 'fraction',
        //	slidesOffsetBefore : -1,
        breakpoints: {
            1200: {
                slidesPerView: 3.2
            },
            991: {
                spaceBetween: 0,
                slidesPerView: 1,
                autoplay: 100000
            }
        }
    });

    $(".small-picture").hover(function () {
        exports.stopAutoplay();
    }, function () {
        exports.startAutoplay();
    });
    var swiper = new Swiper('.related-container', {
        // Default parameters
        slidesPerView: 5,
        spaceBetween: 10,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        autoplay: 3000,
        breakpoints: {
            1200: {
                slidesPerView: 4
            },
            768: {
                slidesPerView: 3.2
            },
            540: {
                slidesPerView: 2.2
            }
        }
    });
    $(".related-container").hover(function () {
        swiper.stopAutoplay();
    }, function () {
        swiper.startAutoplay();
    });
});
//photoswiper
$(function () {
    var pic = $("[data-size]");
    var smailBox = $("#small-box");
    var swiperSlide = $(".swiper-slide");
    pic.each(function () {
        var _this = $(this);
        var images = new Image(); //实例化图片
        images.src = _this.find('img').attr('src'); //获取小图的链接 进行计算
        //console.log(images.src)
        //	console.log($(window).width())
        images.onload = function () { //当图片加载完成时
            var tpW = images.width; //图片实际宽度
            var tpH = images.height; //图片实际高度
            var winW = $(window).width(); //浏览器实际宽度
            var winH = $(window).height(); //浏览器实际高度
            var tpRatio = Math.min((winW / tpW), (winH / tpH));
            var getW = tpW * tpRatio;
            //console.log(getW);
            var getH = tpH * tpRatio; // 屏幕高度 * 图片宽度 / 图片高度
            //console.log(getH)
            _this.attr("data-size", parseInt(getW, 10) + "x" + parseInt(getH, 10));
            _this.attr("data-med-size", parseInt(getW, 10) + "x" + parseInt(getH, 10));
        };
    });
    smailBox.click(function () {
        var $smallPicture = $("#small-picture");
        swiperSlide.eq($smallPicture.attr("referen")).trigger("click");
    });
});
//放大镜
$(function () {
    function zoom(Boolean) {
            var $smallBox = $("#small-box");
            var $bigBox = $("#big-box");
            var $bigBoxImg = $bigBox.find("img");
            var $moveBox = $("#move-box");
            if (Boolean) {
                $smallBox.mouseover(function () {
                    $moveBox.show();
                    $bigBox.show();
                });
                $smallBox.mouseout(function () {
                    $moveBox.hide();
                    $bigBox.hide();
                });
                $smallBox.mousemove(function (e) {
                    var left = e.pageX - $smallBox.offset().left - $moveBox.width() / 2;
                    var top = e.pageY - $smallBox.offset().top - $moveBox.height() / 2;
                    if (left < 0) {
                        left = 0;
                    } else if (left > $smallBox.outerWidth() - $moveBox.outerWidth()) {
                        left = $smallBox.outerWidth() - $moveBox.outerWidth();
                    }
                    if (top < 0) {
                        top = 0;
                    } else if (top > $smallBox.outerHeight() - $moveBox.outerWidth()) {
                        top = $smallBox.outerHeight() - $moveBox.outerHeight();
                    }
                    $moveBox.css({
                        left: left + "px",
                        top: top + "px",
                        width: "200px",
                        height:"200px"
                    });
                    var precentX = left / ($smallBox.outerWidth() - $moveBox.outerWidth());
                    var precentY = top / ($smallBox.outerHeight() - $moveBox.outerHeight());
                    var bx = precentX * ($bigBoxImg.width() - $bigBox.width());
                    var by = precentY * ($bigBoxImg.height() - $bigBox.height());
                    $bigBox.css({
                        left: "105%",
                        width: "486px",
                        height:"486px"
                    });
                    $bigBoxImg.css({
                        left: -bx + "px",
                        top: -by + "px",
                        width: $("#small-box").find('img').width() * 2.439,
                        height: $("#small-box").find('img').height() * 2.439
                    });
                });
            } else {
                $smallBox.mouseover(function () {
                    $moveBox.hide();
                    $bigBox.hide();
                });
            }
        }
        var $window = $(window);
        var $pixel = 990;
        if ($window.width() >= $pixel) {
            zoom(true);
        } else {
            zoom(false);
        }
        $window.resize(function () {
            if ($window.width() >= 991) {
                zoom(true);
            } else {
                zoom(false);
            }
        });
});

//产品的属性
$(function () {
    //下拉菜单
    function showHideDropdownQuantity(id) {
        $('select[name=' + id + '] > option').each(function () {
            $('#' + id + '_' + this.value + '_qty_box').hide();
        });
        $('#' + id + '_' + $('select[name=' + id + '] > option:selected').val() + '_qty_box').css('display', 'inline-block');
    }
    $("[data-toggle='attribute-dropdown']").each(function () {
        showHideDropdownQuantity($(this).attr("id"));
    });
    //单选框
    function showHideRadioQuantity(id) {
        $('input[name=' + id + ']:radio').each(function () {
            $('#' + $(this).attr('id') + '_qty_box').hide();
        });
        $('#' + id + '_' + $('input[name=' + id + ']:radio:checked').val() + '_qty_box').css('display', 'inline-block');
    }
    $("[data-toggle='attribute-radio']").each(function () {
        showHideRadioQuantity($(this).data("id"));
    });
    //复选框
    function showHideCheckboxQuantity(id) {
        if ($('#' + id).is(':checked'))
            $('#' + id + '_qty_box').css('display', 'inline-block');
        else
            $('#' + id + '_qty_box').hide();
    }
    $("[data-toggle='attribute-check']").each(function () {
        showHideCheckboxQuantity($(this).attr("id"));
    });
    //文件上传
    function uploaderInit(controlId, endpoint, ext, text) {
        $("#" + controlId + "uploader").fineUploader({
            request: { endpoint: endpoint },
            template: controlId + "-qq-template",
            multiple: false,
            validation: {
                allowedExtensions: ext
            }
        }).on("complete", function (event, id, name, responseJSON, xhr) {
            $("#" + controlId).val(responseJSON.downloadGuid);
            if (responseJSON.success) {
                $("#" + controlId + "downloadurl").html("<a href='" + responseJSON.downloadUrl + "'>" + text + "</a>");
                $("#" + controlId + "remove").show();
            }
            if (responseJSON.message) {
                alert(responseJSON.message);
            }
        });

        $("#" + controlId + "remove").click(function (e) {
            $("#" + controlId + "downloadurl").html("");
            $("#" + controlId).val('');
            $(this).hide();
        });
    }
    $("[data-toggle='attribute-uploader']").each(function () {
        var $this = $(this);
        uploaderInit($this.data("id"), $this.data("endpoint"), $this.data("ext"), $this.data("text"));
    });
    //图片切换
    var $smailSlide = $(".small-picture .swiper-slide");
    $("[data-picurl]").click(function () {
        var $this = $(this);
        setTimeout(function () {
            if ($this.parent().find("> input:checked").length)
                $smailSlide.each(function () {
                    if ($(this).attr("href") === $this.data("picurl")) {
                        $(this).data("hover")($(this));
                    }
                });
        }, 100);
    });
    //产品选项

    function attributeChangeHandler(productId, url, instock) {
        $.ajax({
            cache: false,
            url: url,
            data: $('#product-details-form').serialize(),
            type: 'post',
            success: function (data) {
                //console.log(data);
                if (data.price) {
                    var oldPrice = $('.old-price-' + productId);
                    if (oldPrice.text() === "" && data.price !== $('.price-value-' + productId).text()) {
                        oldPrice.text($('.price-value-' + productId).text());
                    }
                    $('.price-value-' + productId).text(data.price);
                }
                if (data.sku) {
                    $('#sku-' + productId).text(data.sku).parent(".sku").show();
                } else {
                    $('#sku-' + productId).parent(".sku").hide();
                }
                if (data.mpn) {
                    $('#mpn-' + productId).text(data.mpn).parent(".manufacturer-part-number").show();
                } else {
                    $('#mpn-' + productId).parent(".manufacturer-part-number").hide();
                }
                if (data.gtin) {
                    $('#gtin-' + productId).text(data.gtin).parent(".gtin").show();
                } else {
                    $('#gtin-' + productId).parent(".gtin").hide();
                }
                if (data.stockAvailability) {
                    $('#stock-availability-value-' + productId).text(data.stockAvailability);
                    if (data.stockAvailability === instock) {
                        $("#product-buy-" + productId).removeClass("disabled");
                    } else {
                        $("#product-buy-" + productId).addClass("disabled");

                    }
                }
                if (data.enabledattributemappingids) {
                    for (var i = 0; i < data.enabledattributemappingids.length; i++) {
                        $('#product_attribute_label_' + data.enabledattributemappingids[i]).show();
                        $('#product_attribute_input_' + data.enabledattributemappingids[i]).show();
                    }
                }
                if (data.disabledattributemappingids) {
                    for (var i = 0; i < data.disabledattributemappingids.length; i++) {
                        $('#product_attribute_label_' + data.disabledattributemappingids[i]).hide();
                        $('#product_attribute_input_' + data.disabledattributemappingids[i]).hide();
                    }
                }
                if (data.message) {
                    alert(data.message);
                }
                $.event.trigger({ type: "product_attributes_changed", changedData: data });
            }
        });
    }

    $(".product-attributes").each(function () {
        var $this = $(this);
        var productId = $this.data("id");
        var url = $this.data("url");
        var instock = $this.data("instock");
        var outstock = $this.data("outstock");
        var stockData = $this.data("attributes");
        var attributeStock = typeof stockData === "object";
        $('#stock-availability-value-' + productId).data("lock", false);
        attributeChangeHandler(productId, url, instock);


        var dropDown = $this.find("[data-toggle='attribute-dropdown']");
        var radioBox = $this.find("[data-toggle='attribute-radio']");
        var checkBox = $this.find("[data-toggle='attribute-checkbox']");

        function getSelected() {
            var selected = [];
            dropDown.each(function () {
                var $thisEle = $(this);
                if ($thisEle.val() !== 0) {
                    var kv = {};
                    kv.Name = $thisEle.attr("name");
                    kv.Value = [$thisEle.val()];
                    selected.push(kv);
                }
            });
            radioBox.each(function () {
                var $thisEle = $(this);
                var item = $thisEle.find("input:radio:checked");
                if (item.length === 0) return;
                var kv = {};
                kv.Name = $thisEle.data("id");
                kv.Value = [];

                item.each(function () {
                    kv.Value.push($(this).val());
                });
                selected.push(kv);
            });
            checkBox.each(function () {
                var $thisEle = $(this);
                var item = $thisEle.find("input:checkbox:checked");
                if (item.length === 0) return;
                var kv = {};
                kv.Name = $thisEle.data("id");
                kv.Value = [];
                item.each(function () {
                    kv.Value.push($(this).val());
                });
                selected.push(kv);
            });
            return selected;
        }
        function removeKey(selected, key) {
            var result = [];
            for (var i in selected) {
                var item = selected[i];
                if (item.Name !== key) {
                    result.push(item);
                }
            }
            return result;
        }
        function arrayEq(ar1, ar2) {
            if (ar1.length !== ar2.length)
                return false;
            var sar1 = ar1.sort();
            var sar2 = ar2.sort();
            for (var i = 0; i < ar1.length; i++) {
                if (sar1[i] !== sar2[i])
                    return false;
            }
            return true;
        }
        function arrayInclude(ar1, ar2) {
            for (var i = 0; i < ar1.length; i++) {
                var a1 = ar1[i];
                var a1InAr2 = false;
                for (var j = 0; j < ar2.length; j++) {
                    if (a1 === ar2[j])
                        a1InAr2 = true;
                }
                if (!a1InAr2) return false;
            }
            return true;
        }
        function inStock(ar1, stockData, isFullEq) {
            if (!stockData.AllowOutOfStockOrders && stockData.StockQuantity <= 0) return false;
            for (var a1 in ar1) {
                var a1InAr2 = false;
                for (var a2 in stockData.Attribute) {
                    if (isFullEq) {
                        if (ar1[a1].Name === stockData.Attribute[a2].Name && arrayEq(ar1[a1].Value, stockData.Attribute[a2].Value))
                            a1InAr2 = true;
                    } else {
                        if (ar1[a1].Name === stockData.Attribute[a2].Name && arrayInclude(ar1[a1].Value, stockData.Attribute[a2].Value))
                            a1InAr2 = true;
                    }

                }
                if (!a1InAr2) return false;
            }
            return true;
        }
        function isEnable(name, val, selected, isFullEq) {
            var newArray = [];

            for (var s in selected) {
                newArray.push(selected[s]);
            }
            var o = {};
            o.Name = name;
            o.Value = [val];
            newArray.push(o);
            for (var i in stockData) {
                var isMatch = inStock(newArray, stockData[i], isFullEq);
                if (isMatch) return true;
            }
            return false;
        }
        function checkOption() {
            if (!attributeStock) return;
            var selected = getSelected();
            radioBox.each(function () {
                var $thisEle = $(this);
                var key = $thisEle.data("id");
                var selectedNotThis = removeKey(selected, key);
                var $attr = $thisEle.find("input:radio");
                $attr.each(function () {
                    var $radioBox = $(this);
                    var isDisable = !isEnable(key, $radioBox.val(), selectedNotThis, true);

                    $radioBox.prop("disabled", isDisable);
                    if (isDisable) {
                        $radioBox.addClass("disabled").prop("checked", false);
                    } else {
                        $radioBox.removeClass("disabled");
                    }
                });
            });
            checkBox.each(function () {
                var $thisEle = $(this);
                var key = $thisEle.data("id");
                var $attr = $thisEle.find("input:checkbox");
                $attr.each(function () {
                    var $checkbox = $(this);
                    var isDisable = !isEnable(key, $checkbox.val(), selected, false);

                    $checkbox.prop("disabled", isDisable);
                    if (isDisable) {
                        $checkbox.addClass("disabled").prop("checked", false);
                    } else {
                        $checkbox.removeClass("disabled");
                    }
                });
            });



        }
        function resetStock() {
            if (stockData.length === 0) return;
            var sum = 0;
            for (var i in stockData) {
                if (stockData[i].StockQuantity !== 0 || stockData[i].AllowOutOfStockOrders) {
                    sum = 1;
                    break;
                }
            }
            if (sum === 0) {
                $('#stock-availability-value-' + productId).data("lock", true);
                $('#stock-availability-value-' + productId).text(outstock);
                $("#product-buy-" + productId).addClass("disabled");

            } else {
                $('#stock-availability-value-' + productId).text(instock);
            }
        }
        function attributeChange() {
            attributeChangeHandler(productId, url, instock);
            checkOption(); //setTimeout(checkOption, 100);
        }
        //事件
        $this.find("[data-toggle='attribute-dropdown']").change(attributeChange);
        $this.find("[data-toggle='attribute-radio'] input:radio").click(attributeChange);

        $this.find("[data-toggle='attribute-check'] + label").click(attributeChange);

        $this.find(".enter-qty-box").click(attributeChange);
        //单选框功能
        $this.find("input:radio + label").click(function () {
            var $thisRadio = $(this).parent().find("> input:radio");
            if ($thisRadio.prop("checked")) {
                $thisRadio.prop("checked", false);
                attributeChange();
                return false;
            }
        });
        checkOption();
        resetStock();
    });
    $(".no-attributes").each(function () {
        var $this = $(this);
        var productId = $this.data("id");
        var url = $this.data("url");
        var instock = $this.data("instock");
        attributeChangeHandler(productId, url, instock);
    });

});
//按钮和数量
$(function () {
    $(".enter-int-input").keyup(toInt).blur(toInt).focus(function () {
        $(this).select();
    });


    $(".btn-add-buy,.btn-add-cart").click(function () {
        var $this = $(this);
        if (!$this.is(".disabled")) {
            AjaxCart.addproducttocart_details($this.data("url"), '#product-details-form');
        }
        return false;
    });

    //数量
    $(".shopping-product-qty").each(function () {
        var $this = $(this);
        var $spNumber = $this.find(".qty-input");
        var $qtyBtn = $this.find(".qty-btn");
        var $qtyUp = $qtyBtn.find(".qty-up");
        var $qtyDown = $qtyBtn.find(".qty-down");
        var oTimer;
        //        console.log($qtyUp);
        function changeQty(i) {

            $spNumber.val(parseInt($spNumber.val()) + parseInt(i));
            if ($spNumber.val() <= 1) {
                $spNumber.val(1);
            }
        }
        //加加
        $qtyUp.mousedown(function () {


            changeQty(1);
            oTimer = setTimeout(function () {
                clearTimeout(oTimer);
                oTimer = setInterval(function () {
                    changeQty(1);

                }, 100);
            }, 300);
        });
        $qtyUp.mouseup(function () {
            clearInterval(oTimer);
            clearTimeout(oTimer);
        });
        //减减
        $qtyDown.mousedown(function () {
            changeQty(-1);
            oTimer = setTimeout(function () {
                clearTimeout(oTimer);
                oTimer = setInterval(function () {
                    changeQty(-1);
                }, 100);
            }, 300);
        });
        $qtyDown.mouseup(function () {
            clearInterval(oTimer);
            clearTimeout(oTimer);
        });
    });

});
//评价
$(function () {
    var reviewContent = $("#review-content"),
        url = reviewContent.data("url");
    function setProductReviewHelpfulness(wasHelpful, productReviewId) {
        $.ajax({
            cache: false,
            type: "POST",
            url: url,
            data: { "productReviewId": productReviewId, "washelpful": wasHelpful },
            success: function (data) {
                $("#helpfulness-vote-yes-" + productReviewId).html(data.TotalYes);
                $("#helpfulness-vote-no-" + productReviewId).html(data.TotalNo);
                $("#helpfulness-vote-result-" + productReviewId).html(data.Result).fadeIn("slow").delay(1000)
                    .fadeOut("slow");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Failed to vote. Please refresh the page and try one more time.');
            }
        });
    }
    reviewContent.on("click", ".vote-yes", function () {
        setProductReviewHelpfulness('true', $(this).data("id"));
    });
    reviewContent.on("click", ".vote-no", function () {
        setProductReviewHelpfulness('false', $(this).data("id"));
    });

});

// 监控属性标签的宽度
$(function () {
    var max;
    var arr = [];
    $(".product-attributes dt").each(function () {
        arr.push($(this).outerWidth())
    })
    max = Math.max.apply(null, arr);
    $(".product-attributes dt").each(function () {
        $(this).width(max)
    })
    $(".shopping-product-qty label").width(max + 30);
})