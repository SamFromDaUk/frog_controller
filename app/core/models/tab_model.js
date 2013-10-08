App.Models.Tab = can.Model.extend({
    findAll: function() {
        return $.Deferred().resolve(this.models([{
            name: 'setup',
            controller: 'Setup'
        }, {
            name: 'login',
            controller: 'Login'
        }, {
            name: 'deployment',
            controller: 'Deployment',
            active: true
        }, {
            name: 'helpers',
            controller: 'Helpers'
        }]));
    }
}, {

});

App.Models.Tab.List = can.Model.List.extend({

}, {
    match: function(attr, value) {
        var i = 0,
            ret = new App.Models.Tab.List([]);

        for (; i < this.length; i++) {
            if (typeof this[i][attr] !== 'undefined' && this[i][attr] === value) {
                ret.push(this[i]);
            }
        }

        return ret;
    },

    save: function() {
        return this.serialize();
    }
});