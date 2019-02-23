var Aviasales = function() {

    // Сохранить экземпляр
    var instance = {};
    _.extend(instance, Backbone.Events);

    // Переопределить конструктор.
    Aviasales = function Aviasales() {
        return instance;
    }

    // Перенесем свойства прототипа
    Aviasales.prototype = this;

    // Создать экземпляр
    instance = new Aviasales();

    // Переустановить указатель на конструктор.
    instance.constructor = Aviasales

    // Добавить остальную функциональность.

    instance.models = {}
    instance.views = {}
    instance.templates = {}
    instance.collections = {}

    instance.models.ticket = new TicketModel();
    instance.collections.tickets = new Backbone.Collection();
    instance.views.tickets = new TicketsView();

    instance.models.action = new ActionModel();
    instance.collections.actions = new ActionCollection();
    instance.views.actions = new ActionsView();

    instance.collections.need_actions = new ActionRequestCollection();


    instance.models.mission = new MissionModel();
    instance.collections.missions = new MissionCollection();
    instance.views.missions = new MissionsView();

    instance.collections.airports = new Backbone.Collection();

    instance.on("select_action", function(trg) {
        console.log("event::select_action");
        instance.views.actions.select(trg);
    });


    instance.on("render_tickets", function() {

        var params = instance.collections.need_actions.toJSON();

        instance.api.findTickets(params,function(tickets) {

            _.each(tickets.res, function(obj, index) {

                obj = JSON.parse(obj);
                //console.log( obj );
                _.each(obj.tickets, function(ticket, index) {
                    instance.collections.tickets.add(ticket);
                });
            });

            instance.views.tickets.render(instance.collections.tickets);
        });

    });

    instance.api = new AviasalesAPI(instance);

    instance.router = new Router({
        app : instance
    });


    return instance;
}