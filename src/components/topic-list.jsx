var React = require('react'),
    Reflux = require('reflux'),
    TopicStore = require('../stores/topic-store'),
    Actions = require('../actions'),
    ReactRouter = require('react-router')
    Link = ReactRouter.Link;

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(TopicStore, 'onChange')
    ],
    getInitialState: function() {
        return {
            topics: []
        }
    },

    componentWillMount: function() {
        Actions.getTopics();
    },

    render: function() {
        return <div className="list-group">
            {this.renderTopics()}
        </div>
    },

    renderTopics:function() {
        return this.state.topics.map(function(topic) {
            return <Link to={"topics/" + topic.id} className="list-group-item" key={topic.id}>
                <h4>{topic.name}</h4>
                <p>{topic.description}</p>
            </Link>
        })
    },

    onChange: function(event, topics) {
        this.setState({topics: topics})
    }
});