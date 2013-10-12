App.Controllers.Setup = can.Control.extend({
    init: function() {
        this.elements = {};
        this.render();
    },

    render: function() {
        var self = this;

        this.load().done(function() {
            self.element.html(can.view('//app/core/views/setup.ejs', self.options));

            self.elements.addInput = self.element.find('div.add input');
            self.elements.addButton = self.element.find('div.add button.btn-primary');
        });
    },

    load: function() {
        var self = this;

        if (this.options.urls) {
            return $.Deferred().resolve();
        }

        return App.Models.Url.findAll().done(function(urls) {
            self.options.urls = urls;
        });
    },

    save: function() {
        return App.Models.Url.saveAll(this.options.urls);
    },

    'app.focus': function() {

    },

    'save.pane': function() {
        this.save();
    },

    '{App.Models.Url} created': function(list, ev, item) {
        var self = this;

        this.options.urls.push(item);
        this.save().done(function() {
            self.render();
        });
    },

    '{App.Models.Url} destroyed': function(list, ev, item) {
        var self = this;

        this.save().done(function() {
            self.render();
        });
    },

    'div.add button.btn-primary click': function(el, ev) {
        var value = this.elements.addInput.val();

        if (value.length) {
            var model = App.Models.Url.model({
                link: value
            }).save();
        }
    },

    '.list-group a click': function(el, ev) {
        var self = this;

        if ($(ev.target).is('span.close')) {
            return;
        }

        this.options.urls.each(function(model, i, list) {
            console.log(arguments);
            model.attr('active', false);
        });

        el.data('model').attr('active', true);
        this.save().done(function() {
            self.render();
        });
    },

    '.list-group .close click': function(el, ev) {
        el.parent().data('model').destroy();
    }
});