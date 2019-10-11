
$(function() {
    var al = $("#addressList"),
        confirmMessage = al.data("confirm"),
        url = al.data("url");
    $("[data-toggle='delete']").click(function() {
        var $this = $(this),
            id = $this.data("id");

        if (confirm(confirmMessage)) {
            var postData = {
                addressId: id
            };
            addAntiForgeryToken(postData);

            $.ajax({
                cache: false,
                type: 'POST',
                url: url,
                data: postData,
                dataType: 'json',
                success: function (data) {
                    location.href = data.redirect;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert('Failed to delete');
                }
            });
        }
    });
});