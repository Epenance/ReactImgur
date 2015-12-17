var React = require('react'),
    ReactRouter = require('react-router'),
    HashHistory = require('react-router/lib/hashhistory'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route;

var Main = require('./components/main'),
    Topic = require('./components/topic'),
    ImageDetail = require('./components/image-detail');


module.exports = (
    <Router history={new HashHistory}>
        <Route path="/" component={Main}>
            <Route path="topics/:id" component={Topic} />
            <Router path="images/:id" component={ImageDetail} />
        </Route>
    </Router>
);