App.Controllers.Deployment = can.Control.extend({
    init: function() {
        this.getDeployments();
        this.element.html(can.view('//app/core/views/deployment.ejs'));
    },

    'app.focus': function() {

    },

    'save.pane': function() {

    },

    getDeployments: function() {
        var self = this;

        if (!this.options.deployment) {
            App.Models.Deployment.findAll().done(function(deployments) {
                self.options.deployment = deployments;
            });
        }
    }
});