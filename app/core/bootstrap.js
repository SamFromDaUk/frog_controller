steal(
    '//jquery/jquery.js',
    '//can/can.js',
    '//app/public/libs/bootstrap.min.css',
    '//app/public/core.css'
).then(function() {
    window.App = {
        Controllers: {},
        Models: {},
        Views: {}
    };
}).then(
    '//app/public/libs/bootstrap.min.js',
    '//app/core/controllers/controllers',
    '//app/core/models/models',
    '//app/core/views/views'
).then(function() {

    //dev helpers - START
    window.wipe = function() {
        localStorage.setItem('frog_controller', '');
    };
    //dev helpers - END

    $('body').append('<div />');
    new App.Controllers.Core($('body').find('div'));
});