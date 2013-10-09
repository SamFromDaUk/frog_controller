App.Controllers.Core = can.Control.extend({
    init: function() {
        var self = this;

        this.load();

        if (!this.settings) {
            console.log('dfsjklf');
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

    load: function() {
        var storage = localStorage.getItem('frog_controller');

        if (storage) {
            this.settings = JSON.parse(storage);
            this.settings.tabs = App.Models.Tab.models(this.settings.tabs);
        }
    },

    save: function() {
        localStorage.setItem('frog_controller', JSON.stringify({
            tabs: this.settings.tabs.serialize()
        }));
    },

    setDefaults: function() {
        var self = this;

        App.Models.Tab.findAll().done(function(tabs) {
            localStorage.setItem('frog_controller', JSON.stringify({
                tabs: tabs.serialize()
            }));
            self.load();
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
        this.save();
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
            this.elements['pane_' + tab.attr('name')] = pane = $('<li class="fade ' +tab.attr('name')+ '" />').appendTo(this.elements.pane);
            new App.Controllers[tab.attr('controller')](pane, this.settings);
        } else {
            pane.trigger('app.focus');
        }

        if (pane.length && nav.length) {
            nav.addClass('active').siblings().removeClass('active');
            pane.addClass('in').siblings().removeClass('in');
            this.setActivePane(tab.attr('name'));
            this.element.trigger('app.save');
            return;
        }
    },

    getTab: function(tab_name) {
        return this.settings.tabs.match('name', tab_name)[0];

    },

    setActivePane: function(tab_name) {
        this.settings.tabs.each(function(tab, index) {
            tab.attr('active', tab.attr('name') === tab_name);
        });
    },

    'ul.nav-tabs li click': function(el, ev) {
        this.showPane(this.getTab(el.attr('data-pane')));
    }
});