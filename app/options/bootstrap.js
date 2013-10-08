steal(
    '//jquery/jquery.js',
    '//can/can.js',
    '//frog_controller/public/libs/bootstrap.min.css',
    '//frog_controller/options/public/options.css'
).then(function() {
    window.App = {
        Controllers: {},
        Models: {},
        Views: {}
    };
}).then(
    '//frog_controller/options/controllers/controllers',
    '//frog_controller/options/models/models',
    '//frog_controller/options/views/views'
).then(function() {
    new App.Controllers.Options($('body').append('<div />'));
});