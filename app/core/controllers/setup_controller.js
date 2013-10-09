App.Controllers.Setup = can.Control.extend({
    init: function() {
        this.render();
    },

    render: function() {
        this.element.html(can.view('//app/core/views/setup.ejs'));
    },

    'app.focus': function() {

    },

    'save.pane': function() {

    }
});