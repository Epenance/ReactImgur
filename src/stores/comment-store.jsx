var Api = require('../utils/api'),
    Reflux = require('reflux'),
    Actions = require('../actions'),
    _ = require('lodash');

module.exports = Reflux.createStore({
    listenables: [Actions],

    getImage: function(id) {
        Api.get('gallery/'+ id +'/comments').then(function(json) {
            this.comment = json.data;
            this.triggerChange();
        }.bind(this));
    },

    triggerChange: function() {
        this.trigger('change', this.comment);
    }
});