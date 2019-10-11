window.Echo = (function (window, document, undefined) {
    'use strict';
    var store = [], offset, throttle, poll;
    var _inView = function (el) {
        var coords = el.getBoundingClientRect();
        return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset));
    };
    var _pollImages = function () {
        for (var i = store.length; i--;) {
            var self = store[i];
            if (_inView(self)) {
                var file = self.src;
                self.src = self.getAttribute('data-echo');
                store.splice(i, 1);
                if (file.substr(file.lastIndexOf('.') + 1) == "gif") {
                    if (self.className.search("unloading") != -1) {
                        document.getElementsByClassName("unloading")[0].setAttribute("class", "lazyload ");
                    }
                }
                
            }
        }
    };
    var _throttle = function () {
        clearTimeout(poll);
        poll = setTimeout(_pollImages, throttle);
    };
    var init = function (obj) {
        var nodes = document.querySelectorAll('[data-echo]');
        var opts = obj || {};
        offset = opts.offset || 0;
        throttle = opts.throttle || 250;
        for (var i = 0; i < nodes.length; i++) {
            store.push(nodes[i]);
        }
        _throttle();
        if (document.addEventListener) {
            window.addEventListener('scroll', _throttle, false);
            window.addEventListener('resize', _throttle, false);
        } else {
            window.attachEvent('onscroll', _throttle);
            window.attachEvent('onresize', _throttle);
        }
    };
    return {
        init: init,
        render: _throttle
    };
})(window, document);