//= require_self
//= require_tree ./templates
//= require_tree ./models
//= require_tree ./views
//= require_tree ./routers


$(function() {
    $.ajaxSetup({
        cache : false,
        beforeSend : function() {
        },
        complete : function() {
        },
        dataType: "JSON",
        type: "POST"
    });

    var App = new Aviasales();

    // EVENTS
    $("#what-we-do").delegate(".action", "click", function() {
        App.trigger("select_action", this);
    });

});