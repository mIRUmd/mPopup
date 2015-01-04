$(function () {

    var popup = $('#_sample1').mPopup();
    $('#_open-sample1').on('click',function(e){
        e.preventDefault();
        popup.mPopup('open');
    });

});