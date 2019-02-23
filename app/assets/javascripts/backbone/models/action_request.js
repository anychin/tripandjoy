var ActionRequestModel = Backbone.Model.extend({
    defaults : {
        origin_name : "MOW",
        destination_name : null,
        depart_date : "2013-12-25",
        return_date : "2013-12-26",
        range : 0,
        adults : 1,
        children : 0,
        infants : 0,
        trip_class : 0
    }
})

var ActionRequestCollection = Backbone.Collection.extend({
    model : ActionRequestModel
})