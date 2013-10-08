App.Controllers.Core = can.Control.extend({
    init: function() {
        localStorage.setItem('frog_controller', '');
        var self = this;

        this.loadSettings();

        if (!this.settings) {
            this.setDefaults();
        }

        this.render();

        this.elements = {};
        this.elements.nav =             this.element.find('ul.nav-tabs');
        this.elements.nav_setup =       this.elements.nav.children('li[data-pane="setup"]');
        this.elements.nav_login =       this.elements.nav.children('li[data-pane="login"]');
        this.elements.nav_deployment =  this.elements.nav.children('li[data-pane="deployment"]');
        this.elements.nav_helpers =     this.elements.nav.children('li[data-pane="helpers"]');

        this.elements.pane =            this.element.find('ul.pane-container');
        this.elements.pane_setup =      this.elements.pane.children('li[data-pane="setup"]');
        this.elements.pane_login =      this.elements.pane.children('li[data-pane="login"]');
        this.elements.pane_deployment = this.elements.pane.children('li[data-pane="deployment"]');
        this.elements.pane_helpers =    this.elements.pane.children('li[data-pane="helpers"]');

        this.showPane(this.getActiveTab());

    },

    loadSettings: function() {
        var storage = localStorage.getItem('frog_controller');

        if (storage) {
            this.settings = $.parseJSON(storage);

            if (this.settings.tabs) {
                this.settings.tabs = App.Models.Tab.models(this.settings.tabs);
            }

            if (this.settings.deployment) {
                this.settings.deployment = App.Models.Deployment.models(this.settings.deployment);
            }
        }
    },

    setDefaults: function() {
        var self = this;

        App.Models.Tab.findAll().done(function(tabs) {
            localStorage.setItem('frog_controller', JSON.stringify({
                tabs: tabs.serialize()
            }));
            self.loadSettings();
        });
    },

    getActiveTab: function() {
        return this.settings.tabs.match('active', true)[0];
    },

    render: function() {
        this.element.append(can.view('//app/core/views/core.ejs', {
            tabs: this.settings.tabs
        }));

        this.container = this.element.find('div.pane-container');
    },

    'app.save': function(el, ev) {
        this.elements.pane.children().trigger('save.pane');
    },

    showPane: function(tab) {
        var pane = this.elements['pane_' + tab.name],
            nav = this.elements['nav_' + tab.name];

        if (!pane || !nav) {
            throw new Error('There was an error loading the tab', arguments);
        }

        if (!pane.length) {
            // No pane has already been loaded. Lets make one.
            this.elements['pane_' + tab.name] = pane = $('<li class="fade ' +tab.name+ '" />').appendTo(this.elements.pane);
            new App.Controllers[tab.controller](pane, this.settings);
        } else {
            pane.trigger('app.focus');
        }

        if (pane.length && nav.length) {
            nav.addClass('active').siblings().removeClass('active');
            pane.addClass('in').siblings().removeClass('in');
            return;
        }
    },

    getTab: function(tab_name) {
        return this.settings.tabs.match('name', tab_name)[0];

    },

    'ul.nav-tabs li click': function(el, ev) {
        this.showPane(this.getTab(el.attr('data-pane')));
    }
});