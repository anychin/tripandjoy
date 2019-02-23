var ActionModel = Backbone.Model.extend({
    defaults : {
        id: null,
        name: null,
        price: null,
        public: null,
        cover: null,
        description: null,
        short_description: null,
        mission_id: null,
        origin_name: null,
        created_at: null,
        ord: null,
        updated_at: null
    },

    initialize : function() {

    },

    find : function(id, success) {
        $.ajax({
            url : "/api/get_act",
            data : {
                id : id
            },
            beforeSend : function() {
                console.log("Get all actions");
            },
            success : function(r) {
                (typeof(success) === "function") ? success(r) : false;
            }
        })
    },

    findAll : function(success) {
        $.ajax({
            url : "/api/get_act",
            data : {
                id : null
            },
            beforeSend : function() {
                //console.log("Get actions");
            },
            success : function(r) {
                (typeof(success) === "function") ? success(r) : false;
            }
        })
    }
});

var ActionCollection = Backbone.Collection.extend({
    model : ActionModel
})