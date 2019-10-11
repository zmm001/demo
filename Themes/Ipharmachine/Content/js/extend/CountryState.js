;$(function() {
    $("[data-state]").each(function() {
        var $country = $(this),
            $state = $("#" + $country.data("state")),
            url = $country.data("url");

        $country.change(function() {
            var val = $country.val();
            var statesProgress = $("#states-loading-progress");
            statesProgress.show();

            $.ajax({
                cache: false,
                type: "GET",
                url: url,
                data: { "countryId": val, "addSelectStateItem": "true" },
                success: function (data) {
                    $state.html('');
                    $.each(data, function (id, option) {
                        $state.append($('<option></option>').val(option.id).html(option.name));
                    });
                    statesProgress.hide();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert('Failed to retrieve states.');
                    statesProgress.hide();
                }
            });
        });

    });
});