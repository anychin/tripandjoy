var MissionsView = Backbone.View.extend({

    template : JST['backbone/templates/mission'],
    logo : JST['backbone/templates/mission_logo'],

    el : "#mission",

    initialize : function () {

    },

    render : function(collection) {
        var rows, ul;


        this.$el.html('');

        var columns = 3;
        var row = [];
        var logo = true;

        var mission = collection.shift();
        while( typeof (mission) !== "undefined" ) {

            if ( row.length < columns ) {
                row.push(mission);
            }

            if ( row.length === columns && logo === false ) {
                this.create_row(row, logo);
                row = [];
            }

            if ( row.length === columns - 1 && logo === true ) {
                this.create_row(row, logo);
                row = [];
                logo = false
            }

            mission = collection.shift();
        }

        if ( row.length !== 0 ) {
            this.create_row(row, logo);
            logo = false;
        }
    },

    create_row : function(missions, render_logo) {
        this.$el.append("<div class='row-fluid'></div>");
        this.$el.find("div.row-fluid:last").append("<ul class='thumbnails'></ul>");

        var $el = this.$el.find("div.row-fluid:last ul.thumbnails");

        _.each(missions,function(mission, index) {

            this.create_mission($el, mission);

            if ( render_logo === true && index === 0)
                this.create_logo($el);

        }, this);
    },

    create_mission : function ($el,mission) {
        var html = this.template(mission.toJSON());
        $el.append(html);
    },

    create_logo : function($el) {
        var html = this.logo();
        $el.append(html);
    }
})