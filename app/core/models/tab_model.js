App.Models.Tab = can.Model.extend({
    getDefaults: function() {
        var tabs = this.models([{
            name: 'setup',
            controller: 'Setup',
            active: true
        }, {
            name: 'login',
            controller: 'Login'
        }, {
            name: 'deployment',
            controller: 'Deployment'
        }, {
            name: 'helpers',
            controller: 'Helpers'
        }]);

        return $.Deferred().resolve(tabs);
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
    }
});