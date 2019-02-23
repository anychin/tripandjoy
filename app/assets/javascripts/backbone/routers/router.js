var Router = Backbone.Router.extend({

    initialize : function(params) {
        this.app = params.app || false;
        Backbone.history.start();
    },

    routes: {
        "" : "getMissions",
        "actions" : "renderActionsByMissionId",
        "mission/" : "renderActionsByMissionId",
        "mission/:id" : "renderActionsByMissionId",
    },

    renderActionsByMissionId : function(id) {
        console.debug("renderActionsByMissionId", id);
        var App = this.app;

        App.models.action.find(id,function(r) {
            if (r.error !== false ) {
                alert("Ошибка получения действий!")
            }

            $("#wrap [data-route=main]").removeClass("active");
            $("#actions").addClass("active");
            $("#actions-tabs a:first").tab("show");

            App.collections.actions.reset(r.res);
            App.views.actions.render(App.collections.actions);
        });


    },

    getMissions : function() {
        var App = this.app;

        App.models.mission.findAll(function(r) {
            if (r.error !== false ) {
                alert("Ошибка получения миссий!");
            }

            $("#wrap [data-route=main]").removeClass("active");
            $("#mission").addClass("active");


            App.collections.missions.reset(r.res);
            App.views.missions.render(App.collections.missions);
        });
    },
});