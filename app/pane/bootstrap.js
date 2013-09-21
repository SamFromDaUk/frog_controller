steal(
    '//jquery/jquery.js',
    '//can/can.js'
).then(function() {
    window.App = {
        Controllers: {},
        Models: {},
        Views: {}
    };
}).then(
    '//pane/controllers/controllers',
    '//pane/models/models',
    '//pane/views/views'
).then(function() {
    new App.Controllers.Core($('body').append('<div />'));
});