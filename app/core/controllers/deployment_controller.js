App.Controllers.Deployment = can.Control.extend({
    init: function() {
        var self = this;

        this.load();
        this.renderContainer();

        this.getDeployments().done(function() {
            self.renderOptions();
            self.renderDeployments();
        });
    },

    'app.focus': function() {
        this.renderDeployments();
    },

    'save.pane': function() {
        this.save();
    },

    save: function() {
        localStorage.setItem('frog_controller_deployment', JSON.stringify(this.options.flags));
    },

    load: function() {
        var storage = localStorage.getItem('frog_controller_deployment');

        this.options.flags = App.Models.Deployment.flags = storage ? JSON.parse(storage) : App.Models.Deployment.flags;
    },

    renderContainer: function() {
        this.element.html(can.view('//app/core/views/deployment.ejs', this.options));

        this.elements = {};
        this.elements.options = this.element.find('div.options');
        this.elements.deployments = this.element.find('div.deployments');
    },

    renderDeployments: function() {
        this.elements.deployments.html(can.view('//app/core/views/deployment_deployments.ejs', this.options));
    },

    renderOptions: function() {
        this.elements.options.html(can.view('//app/core/views/deployment_options.ejs', this.options));
    },

    getDeployments: function() {
        var self = this;

        return $.Deferred(function(obj) {
            if (!self.options.deployment) {
                App.Models.Deployment.findAll().done(function(deployments) {
                    self.options.deployments = deployments;
                    obj.resolve();
                });
            } else {
                obj.resolve();
            }
        });
    },

    'div.options button click': function(el, ev) {
        var action = el.attr('data-action'),
            enabled = !el.hasClass('btn-success');

        ev.preventDefault();
        el.toggleClass('btn-success btn-warning');
        App.Models.Deployment.setFlag(action, enabled);
        this.renderDeployments();
        this.renderOptions();
        this.save();
    },

    'div.options input.version-input keyup': function(el, ev) {
        App.Models.Deployment.setFlag('v', el.val());
        this.renderDeployments();
        this.save();
    },

    'div.deployment .btn-primary click': function(el, ev) {
        // time to roll.
    }
});