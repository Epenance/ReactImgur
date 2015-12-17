var Api = require('../utils/api'),
    Reflux = require('reflux'),
    Actions = require('../actions'),
    _ = require('lodash');

module.exports = Reflux.createStore({
    listenables: [Actions],

    getImages: function(topicID) {
        return Api.get('topics/' + topicID).then(function(json) {

            this.images = _.reject(json.data, function(image) {
                return image.is_album
            });
            this.triggerChange()
        }.bind(this))
    },

    getImage: function(id) {
      return Api.get('image/' + id).then(function(json) {
          if(this.images) {
              this.images.push(json.data);
          } else {
              this.images = [json.data];
          }

          this.triggerChange();
      }.bind(this));
    },

    find: function(id) {
        var image = _.findWhere(this.images, {id: id});

        if(image) {
            return image
        } else {
            this.getImage(id);
            return null
        }
    },

    triggerChange: function() {
        this.trigger('change', this.images);
    }
});