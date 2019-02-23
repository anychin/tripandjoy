var ActionsView = Backbone.View.extend({
    template : JST['backbone/templates/action'],
    el : "#what-we-do",

    initialize : function () {

    },

    select : function (trg) {
        $(trg).toggleClass("selected");

        App = new Aviasales();
        App.collections.need_actions.reset();

        $("#what-we-do .action.selected").each(function() {
            var city = $(this).attr("data-city");
            App.collections.need_actions.add({destination_name : city});
        });
        App.trigger('render_tickets');

    },

    render : function(collection) {
        var rows, ul;

        this.$el.html('');

        var columns = 3;
        var row = [];

        var action = collection.shift();
        while( typeof (action) !== "undefined" ) {

            if ( row.length < columns ) {
                row.push(action);
            }

            if ( row.length === columns ) {
                this.create_row(row);
                row = [];
            }

            action = collection.shift();
        }

        if ( row.length !== 0 )
            this.create_row(row);
    },

    create_row : function(actions) {
        this.$el.append("<div class='row-fluid'></div>");
        this.$el.find("div.row-fluid:last").append("<ul class='thumbnails'></ul>");

        var $el = this.$el.find("div.row-fluid:last ul.thumbnails");

            _.each(actions,function(action, index) {
            this.create_action($el, action);
        }, this);
    },

    create_action : function ($el,action) {
        //console.log(action.toJSON())
        var html = this.template(action.toJSON());
        $el.append(html);
    }
})