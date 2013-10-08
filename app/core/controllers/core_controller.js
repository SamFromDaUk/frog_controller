App.Controllers.Core = can.Control.extend({
    init: function() {
        var self = this;

        this.loadSettings();

        if (!this.settings) {
            this.setDefaults();
        }

        this.render();
        this.loadPane(this.getActiveTab());
    },

    loadSettings: function() {
        var storage = localStorage.getItem('frog_controller');

        if (storage) {
            this.settings = $.parseJSON(storage);
        }
    },

    setDefaults: function() {
        localStorage.setItem('frog_controller', JSON.stringify({tabs: []}));
        this.loadSettings();
    },

    getActiveTab: function() {
        for (var i = 0, len = this.settings.tabs.length; i < len; i++) {
            if (this.settings.tabs[i].active) {
                return this.settings.tabs[i].name;
            }
            return null;
        }
    },

    render: function() {
        console.log(this);
        this.element.append(can.view('./core/views/core.ejs', {
            tabs: this.settings.tabs
        }));

        this.container = this.element.find('div.pane-container');
    },

    loadPane: function(tab_model) {
        this.element.find('.nav-tabs');


    },

    '.nav-tabs li click': function(el, ev) {
        this.loadPane(el.children('a').text());
    }
});