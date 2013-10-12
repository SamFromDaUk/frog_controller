var config,
    app;

app = {
    initUpgrade: function() {
        window.title = 'DB Upgrading';

        if (config.flags.initial) {
            $('.upgrade').css('right', '51%');
            $('.initial').show();
        }

        $('.upgrade').html('<iframe src="'+ config.upgrade +'"></iframe>');

        $('.upgrade iframe').load(function() {

            if (config.flags.initial) {
                app.initInitial();
            }
        });
    },

    initInitial: function() {
        window.title = 'Setting up users';
        $('initial').html('<iframe src="'+ config.initial +'"></iframe>');

        $('.initial iframe').load(function() {
            window.title = 'Upgrade complete';
        });
    }
};

$(function() {
    chrome.runtime.onMessage.addListener(function(configuration) {
        config = configuration;
        console.log('Config', config);

        app.initUpgrade();
    });
});