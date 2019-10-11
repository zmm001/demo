$(document).ready(function () {

    $('#selectall').click(function () {
        $('.subscription-list .rowcheckbox').attr('checked', $(this).is(':checked')).change();
    });

    $('.subscription-list .rowcheckbox').on('change', function (e) {
        var numChkBoxes = $('.subscription-list .rowcheckbox').length;
        var numChkBoxesChecked = $('.subscription-list .rowcheckbox:checked').length;
        $('#selectall').attr('checked', numChkBoxes == numChkBoxesChecked && numChkBoxes > 0);
    });
});