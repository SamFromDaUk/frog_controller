steal(
    '//jquery/jquery.js',
    '//can/can.js',
    '//frog_controller/public/libs/bootstrap.min.css',
    '//frog_controller/public/core.css'
).then(function() {
    window.App = {
        Controllers: {},
        Models: {},
        Views: {}
    };
}).then(
    '//frog_controller/core/controllers/controllers',
    '//frog_controller/core/models/models',
    '//frog_controller/core/views/views'
).then(function() {

    //dev helpers - START
    window.wipe = function() {
        localStorage.setItem('frog_controller', '');
    };
    //dev helpers - END

    $('body').append('<div />');
    new App.Controllers.Core($('body').find('div'));
});