App.Models.Url = can.Model.extend({
    getUrl: function(type) {
        var map = {
            'upgrade': 'lib/_upgrade.php',
            'setup': 'setup/initial.php'
        };

        if (map[type]) {
            return this.active + map[type];
        }

        return this.active;
    },

    active: 'http://dev-samw.frogosdev.co.uk/frogos/'
}, {

});