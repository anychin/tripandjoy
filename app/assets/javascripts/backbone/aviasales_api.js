AviasalesAPI = function(app) {
    var instance = {

        app : app,

        findTickets : function(params,callback) {
            $.ajax({
                url : "/api/get_tickets",
                data : {search_params: params},
                beforeSend: function() {
                    console.debug("GET Airports", params);
                },
                success : function(r) {
                    (typeof(callback) === 'function') ? callback(r) : false;
                }
            });
        },


        /**
         * Дергаем аэропорты и добавляем в коллекцию.
         * @param {string} iata
         * @param {function} callback
         */
        findAirportsByIata : function(iata, callback) {

            //console.debug("findAirport", iata);

            var fnd = this.app.collections.airports.where({ iata : iata });

            if ( typeof (fnd) !== "undefined" && fnd.length > 0) {
                //console.log(iata, fnd);

                if(typeof(callback) !== 'function')
                    return;

                _.each(fnd, function(air) {
                    callback(air)
                });

                return;
            }

            $.ajax({
                url: "http://places.aviasales.ru",
                type: "GET",
                async: false,
                data : {
                    term: iata,
                    locale : "ru"
                },

                beforeSend : function() {
                    console.debug("GET Airport", iata);
                },

                success : function(r) {
                    _.each(r, function(airport, index) {
                        var air = this.app.collections.airports.add(airport);
                        (typeof(callback) === 'function') ? callback(air) : false;
                    }, this);
                },
                context: this
            })
        }
    }

    return instance;
}