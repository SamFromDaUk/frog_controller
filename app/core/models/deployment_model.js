App.Models.Deployment = can.Model.extend({
    findAll: function() {
        return $.Deferred().resolve(this.models([{
            tabName: 'Uk Primary',
            query: {
                type: 'primary',
                role: 'unified',
                locale: 'uk'
            }
        }]));
    }
}, {

});

App.Models.Deployment.List = can.Model.List.extend({

}, {
    save: function() {
        return this.serialize();
    }
});