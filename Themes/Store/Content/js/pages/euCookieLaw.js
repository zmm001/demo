$(document).ready(function () {
    $('#eu-cookie-bar-notification').show();

    $('#eu-cookie-ok').click(function () {
        $.ajax({
            cache: false,
            type: 'POST',
            url: "/Common/EuCookieLawAccept",
            dataType: 'json',
            success: function (data) {
                $('#eu-cookie-bar-notification').hide();
            },
            failure: function () {
                alert('Cannot store value');
            }
        });
    });
});