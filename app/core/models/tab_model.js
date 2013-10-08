App.Models.Tab = can.Model.extend({
    getDefaults: function() {
        return $.Deferred().resolve(this.models([{
            name: 'setup',
            active: true
        }, {
            name: 'login'
        }, {
            name: 'deployment'
        }, {
            name: 'helpers'
        }]));
    }
}, {

});