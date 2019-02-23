var MissionModel = Backbone.Model.extend({
    defaults : {
    },

    initialize : function() {

    },

    find : function(id, success) {

    },

    findAll : function(success) {
        $.ajax({
            url : "/api/get_missions",
            data : {
                id : null
            },
            beforeSend : function() {
                console.log("Get all missions");
            },
            success : function(r) {
                success(r);
            }
        })
    }
});

var MissionCollection = Backbone.Collection.extend({
    model : MissionModel
})