App.Models.Deployment = can.Model.extend({
    findAll: function() {
        return $.Deferred().resolve(this.models([{
            deploymentName: 'Uk Primary',
            query: {
                type: 'primary',
                locale: 'uk'
            }
        }, {
            deploymentName: 'Uk Secondary',
            query: {
                type: 'secondary',
                locale: 'uk'
            }
        }, {
            deploymentName: 'Uk Unified',
            query: {
                type: 'unified',
                locale: 'uk'
            }
        }, {
            deploymentName: 'Commerical NGN',
            query: {
                type: 'commercial',
                locale: 'uk',
                customer: 'ngn'
            }
        }, {
            deploymentName: 'Malaysia',
            query: {
                type: 'unified',
                locale: 'malaysia'
            }
        }]));
    },

    setFlag: function(flag, value) {
        this.flags[flag] = value;
    },

    flags: {
        reset_db: true,
        log: false,
        version: false,
        initial: false,
        v: ''
    },
}, {
    getUrl: function() {
        var base = 'http://dev-samw.frogosdev.co.uk/frogos/',
            file = 'lib/_upgrade.php',
            params = {},
            flags = App.Models.Deployment.flags;

        for (var i in flags) {
            if ($.inArray(i, ['reset_db', 'log', 'v']) !== -1 && flags[i]) {

                if (i !== 'v' || (i === 'v' && flags.version))
                params[i] = flags[i];
            }
        }

        $.extend(true, params, this.query.serialize());

        return base + file + '?' + $.param(params);
    }
});

App.Models.Deployment.List = can.Model.List.extend({

}, {

});