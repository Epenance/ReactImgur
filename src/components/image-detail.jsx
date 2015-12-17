var React = require('react'),
    Reflux = require('reflux'),
    ImageStore = require('../stores/image-store'),
    Actions = require('../actions'),
    CommentStore = require('../stores/comment-store'),
    CommentBox = require('./comment-box');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(ImageStore, 'onChange'),
        Reflux.listenTo(CommentStore, 'onChange')
    ],

    getInitialState: function() {
       return {
           image: null,
           comment: null
       }
    },

    componentWillMount: function() {
        Actions.getImage(this.props.params.id);
    },

   render: function() {
       return <div className="image-detail">
           {this.state.image ? this.renderContent() : null}
       </div>
   },

    renderContent: function() {
      return <div>
          <div className="panel panel-default">
              <div className="panel-heading">
                  <h4>{this.state.image.title}</h4>
              </div>
              <div className="panel-body">
                  {this.renderImage()}
              </div>
              <div className="panel-footer">
                  <h5>{this.state.image.description}</h5>
              </div>
          </div>
          <h3>Comments</h3>
          {this.renderComments()}
      </div>
    },

    renderComments: function() {
      if(!this.state.comments) {
          return null
      }

        return <CommentBox comments={this.state.comments} />
    },

    renderImage: function() {

        if(this.state.image.animated) {
            return <video preload="auto" loop="loop" autoPlay="autoplay" webkit-playsinline>
                <source src={this.state.image.mp4} type="video/mp4" />
            </video>
        }else {
            return <img src={this.state.image.link} alt=""/>
        }

    },

    onChange: function(event, image) {
        this.setState({
            image: ImageStore.find(this.props.params.id),
            comments: CommentStore.comment
        })
    }
});