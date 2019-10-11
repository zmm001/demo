$(function() {
    var btcBox = $("#plugins-bitcoin"),
        price = btcBox.data("price"),
        currency = btcBox.data("currency"),
        id = btcBox.data("id"),
        address = btcBox.data("address"),
        btcPrice = $("#plugins-bitcoin-price"),
        btcTxt = $("#plugins-bitcoin-text");

    function updateQrcode() {
        $.getJSON("https://blockchain.info/ticker",
            function (obj) {
                var p = price / obj[currency]["15m"];
                var text = "bitcoin:" +
                    address +
                    "?amount=" +
                    p.toFixed(5) +
                    "&message=" + id;
                btcBox.html('').qrcode(text);
                btcTxt.val(text);
                btcPrice.text(p.toFixed(5));
            });
    }
    updateQrcode();
    setInterval(updateQrcode, 15000);

    $("#plugins-bitcoin-text").focus(function() {
        $(this).select();
    });
});

//function update(orderId,bitprice) {
//    $.ajax({
//        type: 'POST',
//        url: "/Plugins/Bitcoin/BitcoinBalanceUpdate",
//        dataType: "json",
//        data: { "orderid": orderId, "price": bitprice},
//        success: function (data) {
//            console.log(data);
//            //if (data.length > 0) {
//            //} else {
//            //}
//        },
//        error: function (xhr, type) {
//            console.log(data);
//        }
//    });
//}
