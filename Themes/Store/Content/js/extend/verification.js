;//必须填写

$(function () {
    function checkRequired() {
        var $this = $(this);
        var tip = $this.siblings(".tips");
        if (!$this.val()) {
            tip.html($this.data('val-required'));
            $this.addClass("border-error");
        } else {
            tip.html('');
            $this.removeClass("border-error");
        }
    }
    $("input[data-val-required],select[data-val-required],textarea[data-val-required]").on("input blur propertychange", checkRequired);
    var emailReg = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    function checkEmail() {
        var $this = $(this);
        if ($.trim($this.val())) {
            var tip = $this.siblings(".tips");

            if (emailReg.test($this.val())) {
                tip.html('');
                $this.removeClass("border-error");
            } else {
                tip.html($this.data('val-email'));
                $this.addClass("border-error");
            }
        }
    }
    $("input[data-val-email]").on("input blur propertychange", checkEmail);
    function checkLength() {
        var $this = $(this);
        if ($.trim($this.val())) {
            var tip = $this.siblings(".tips");
            var min = $this.data("val-length-min");
            var max = $this.data("val-length-max");
            var l = $this.val().length;
            if (l >= min && l <= max) {
                tip.html('');
                $this.removeClass("border-error");
            } else {
                tip.html($this.data('val-length'));
                $this.addClass("border-error");
            }
        }
    }
    $("input[data-val-length]").on("input blur propertychange", checkLength);

    function checkEqual() {
        var $this = $(this);
        if ($.trim($this.val())) {
            var tip = $this.siblings(".tips");
            var to = $($this.data("val-equalto-other"));
            //todo 没找到
            if ($this.val() === to.val()) {
                tip.html('');
                $this.removeClass("border-error");
            } else {
                tip.html($this.data('val-equalto'));
                $this.addClass("border-error");
            }
        }
    }

    $("input[data-val-equalto]").on("input blur propertychange", checkEqual);


});