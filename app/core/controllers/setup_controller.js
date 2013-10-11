App.Controllers.Setup = can.Control.extend({
    init: function() {
        this.elements = {};
        this.render();
    },

    render: function() {
        this.element.html(can.view('//app/core/views/setup.ejs'));

        this.elements.addInput = this.element.find('div.add input');
        this.elements.addButton = this.element.find('div.add button.btn-primary');
    },

    'app.focus': function() {

    },

    'save.pane': function() {

    },

    'div.add button.btn-primary click': function(el, ev) {
        if (this.element.addInput.val().length) {

        }
    }
});