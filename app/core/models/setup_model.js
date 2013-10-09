App.Models.Url = can.Model.extend({
    getUrl: function(type) {
        var map = {
            'upgrade': 'lib/_upgrade.php',
            'setup': 'setup/initial.php'
        };

        if (map[type]) {
            return this.getActive() + map[type];
        }

        return this.active;
    },

    active: '',

    getActive: function() {
        return this.active;
    }
}, {

});