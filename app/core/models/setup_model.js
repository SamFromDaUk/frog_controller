App.Models.Url = can.Model.extend({
    getUrl: function(type) {
        var map = {
            'upgrade': 'lib/_upgrade.php'
        };

        switch(type) {
            case 'upgrade':
                return this.active + map[type];
            default:
                return this.active;
        }
    },

    active: 'http://dev-samw.frogosdev.co.uk/frogos/'
}, {

});