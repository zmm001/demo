;$(function () {
    $("[data-uploader]").each(function() {
        var $this = $(this),
            uploader = $this.data("uploader"),
            tempId = $this.data("temp"),
            id = $this.attr("id"),
            url = $this.data("url"),
            ext = $this.data("ext");
        $("#" + uploader).fineUploader({
            request: {
                endpoint: url
            },
            template: tempId,
            multiple: false,
            validation: {
                allowedExtensions: ext.split(",")
            }
        }).on("complete", function (event, id, name, responseJSON, xhr) {
            $("#" + id).val(responseJSON.downloadGuid);

            if (responseJSON.message) {
                alert(responseJSON.message);
            }
        });

    });
});