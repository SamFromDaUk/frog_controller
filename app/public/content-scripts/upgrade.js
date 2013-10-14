var config,
    connection,
    app;

chrome.runtime.onMessage.addListener(function(configuration) {
    console.log('receiving', configuration);
});

app = {
    initUpgrade: function() {
        window.title = 'DB Upgrading';

        if (config.flags.initial) {
            $('.upgrade').css('right', '50%');
            $('.initial').show();
        }

        // $('.upgrade').html('<iframe src="'+ config.upgrade +'"></iframe>');
        $('.upgrade').html('<iframe src="'+ 'http://www.bbc.co.uk' +'"></iframe>');

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