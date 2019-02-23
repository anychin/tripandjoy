$(function() {
    $("#actions-tabs a").click(function() {
        $(this).tab('show');
        return false
    });

    $('#actions-tabs a[href="#what-we-do"]').tab('show');

    $(".filter-price .price").change(function(){
        var val = $(this).val();
        $(this).next(".price-val").text(val);
    });

    $(".where-we-live-item").click(function() {
        $(this).toggleClass("open");
    });

})