var config,
    app;

app = {
    initUpgrade: function() {
        $('.upgrade').html('<iframe src="'+ config.upgrade +'"></iframe>');

        $('.upgrade iframe').load(function() {

            if (config.flags.initial) {
                app.initInitial();
            }
        });
    },

    initInitial: function() {

        $('.upgrade').css('right', '51%');
        $('.initial').show().html('<iframe src="'+ config.initial +'"></iframe>');
    }
};

$(function() {
    chrome.runtime.onMessage.addListener(function(configuration) {
        config = configuration;
        console.log('Config', config);

        app.initUpgrade();
    });
});