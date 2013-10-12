App.Models.Url = can.Model.extend({
    getUrl: function(type) {
        var map = {
            'upgrade': 'lib/_upgrade.php',
            'setup': 'setup/initial.php'
        };

        if (map[type]) {
            return this.getActive() + map[type];
        }

        return this.getActive();
    },

    create: function() {
        return $.Deferred().resolve();
    },

    findAll: function() {
        var self = this,
            storage;

        return $.Deferred(function(obj) {
            storage = localStorage.getItem('frog_controller_setup');

            if (!storage) {
                self._models = App.Models.Url.models([]);
                obj.resolve(self._models);
                return;
            }

            self._models = App.Models.Url.models(JSON.parse(storage));
            obj.resolve(self._models);
        });
    },

    saveAll: function(urls) {
        var self = this;

        return $.Deferred(function(obj) {
            localStorage.setItem('frog_controller_setup', JSON.stringify(urls.serialize()));
            obj.resolve();
        });
    },

    getActive: function() {
        var match = this._models.match('active', true);

        if (match.length) {
            return match[0].attr('link');
        }

        if (this._models.length) {
            this._models[0].attr('active', true);
            return this.getActive();
        }

        return '';
    }
}, {

});


App.Models.Url.List = can.Model.List.extend({

}, {
    match: function(attr, value) {
        var i = 0,
            ret = new App.Models.Url.List([]);

        for (; i < this.length; i++) {
            if (typeof this[i][attr] !== 'undefined' && this[i][attr] === value) {
                ret.push(this[i]);
            }
        }

        return ret;
    }
});