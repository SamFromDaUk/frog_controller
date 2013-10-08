App.Controllers.Core = can.Control.extend({
    init: function() {
        var self = this;

        this.loadSettings();

        if (!this.settings) {
            this.setDefaults();
        }

        this.render();
        this.elements = {};
        this.elements.nav = this.element.find('ul.nav-tabs');
        this.elements.nav_setup = this.elements.nav.find('li[data-pane="setup"]');
        this.elements.nav_login = this.elements.nav.find('li[data-pane="login"]');
        this.elements.nav_deployment = this.elements.nav.find('li[data-pane="deployment"]');
        this.elements.nav_helpers = this.elements.nav.find('li[data-pane="helpers"]');

        this.loadPane(this.getActiveTab());

    },

    loadSettings: function() {
        var storage = localStorage.getItem('frog_controller');

        if (storage) {
            this.settings = $.parseJSON(storage);
        }
    },

    setDefaults: function() {
        var self = this;

        App.Models.Tab.getDefaults().done(function(tabs) {
            localStorage.setItem('frog_controller', JSON.stringify({
                tabs: tabs
            }));
            self.loadSettings();
        });
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
        this.element.append(can.view('//app/core/views/core.ejs', {
            tabs: this.settings.tabs
        }));

        this.container = this.element.find('div.pane-container');
    },

    showPane: function(tab_name) {
        var pane = this.elements['pane_' + tab_name];

        if (pane) {
            pane.siblings().removeClass('in');
            pane.addClass('in');
            pane.trigger('app.focus');
            return;
        }


    },

    '.nav-tabs li click': function(el, ev) {
        this.showPane(el.attr('data-pane'));
    }
});