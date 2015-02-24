hljs.initHighlightingOnLoad();
$(function () {

    var popup = $('#_sample1').mPopup();
    $('#_open-sample1').on('click',function(e){
        e.preventDefault();
        popup.mPopup('open');
    });

    var popup2 = $('#_sample2').mPopup({
        showOverlay : false
    });
    $('#_open-sample2').on('click',function(e){
        e.preventDefault();
        popup2.mPopup('open');
    });
});