var TicketsView = Backbone.View.extend({
    template : JST['backbone/templates/ticket'],
    flight_template : JST['backbone/templates/flight'],
    el : "#tickets-box",

    initialize : function () {
        this.app = new Aviasales();
    },

    render : function(collection) {

        var rows, ul;

        this.$el.html('');

        var columns = 1;
        var row = [];

        var ticket = collection.shift();
        while( typeof (ticket) !== "undefined" ) {

            if ( row.length < columns ) {
                row.push(ticket);
            }

            if ( row.length === columns ) {
                this.create_row(row);
                row = [];
            }

            ticket = collection.shift();
        }

        if ( row.length !== 0 )
            this.create_row(row);
    },

    create_row : function(tickets) {
        this.$el.append("<div class='row-fluid'></div>");
        var $el = this.$el.find("div.row-fluid:last");

        _.each(tickets,function(ticket, index) {
            this.create_ticket($el, ticket);
        }, this);
    },

    create_ticket : function ($el,ticket) {

        var transfers;
        var data = {
            there : [],
            back : []
        }

        //console.log(ticket.toJSON())

        // Туда
        var direct_flights = ticket.get("direct_flights");
        // Подсчитываем сколько пересадок
        transfers = direct_flights.length - 1;
        _.each(direct_flights, function(flight, index) {

            // context = this
            this.preloadAirports(flight, function(context) {
                var origin, destination;
                origin = context.app.collections.airports.where({iata: flight.origin})
                destination = context.app.collections.airports.where({iata: flight.destination})

                var date = new Date(flight.arrival*1000);
                data.there.push({
                    origin : origin[0].toJSON(),
                    destination : destination[0].toJSON(),
                    date : date.getFullYear()+"/"+date.getMonth()+"/"+date.getDay(),
                    time : date.getHours()+":"+date.getMinutes(),
                    airline : "Аэрофлот",
                    aircraft : flight.aircraft,
                    duration : flight.duration / 60,
                    transfers : transfers
                });
            });

        }, this);


        // Обратно
        var return_flights = ticket.get("return_flights");
        transfers = return_flights.length - 1;
        _.each(return_flights, function(flight, index) {

            this.preloadAirports(flight, function(context) {
                var origin, destination;
                origin = context.app.collections.airports.where({iata: flight.origin})
                destination = context.app.collections.airports.where({iata: flight.destination})

                var date = new Date(flight.arrival*1000);
                data.back.push({
                    origin : origin[0].toJSON(),
                    destination : destination[0].toJSON(),
                    date : date.getFullYear()+"/"+date.getMonth()+"/"+date.getDay(),
                    time : date.getHours()+":"+date.getMinutes(),
                    airline : "Аэрофлот",
                    aircraft : flight.aircraft,
                    duration : flight.duration / 60,
                    transfers : transfers
                });
            });

        }, this);


        var html = this.template(ticket.toJSON());
        $el.append(html);
        $el = $el.find(".where-we-fly-table:last");


        _.each(data.there, function(flight, index) {

            var origin = flight.origin;
            origin = origin.name.split(",");
            flight.origin = origin[0];

            var destination = flight.destination;
            destination = destination.name.split(",")
            flight.destination = destination[0];

            flight.css_class = "there";

            var row = this.flight_template(flight);
            $el.append(row);
        }, this);

        _.each(data.back, function(flight, index) {

            var origin = flight.origin;
            origin = origin.name.split(",");
            flight.origin = origin[0];

            var destination = flight.destination;
            destination = destination.name.split(",")
            flight.destination = destination[0];

            flight.css_class = "back";


            var row = this.flight_template(flight);
            $el.append(row);
        }, this);
    },


    preloadAirports : function(flight, callback) {
        //console.debug("preload_citys", flight);
        this.app.api.findAirportsByIata(flight.origin);
        this.app.api.findAirportsByIata(flight.destination);
        callback(this);
    }
})