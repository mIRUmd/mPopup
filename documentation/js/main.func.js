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

    var popup3 = $('#_sample3').mPopup();
    $('#_open-sample3').on('click',function(e){
        e.preventDefault();
        popup3.mPopup('open');
    });

    var popup4 = $('#_sample4').mPopup({
        showOverlay : false
    });

    $('#_open-sample4').on('click',function(e){
        e.preventDefault();
        popup4.mPopup('open');
    });

    popup4.on('mPopup:open', function () {
        alert('mPopup opened');
    });

    popup4.on('mPopup:close', function () {
        alert('mPopup closed');
    });
});