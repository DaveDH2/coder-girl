﻿var React = require('react');
var Leaderboard = require('./Leaderboard');
var ChallengeEditor = require('./ChallengeEditor');
var ChallengeInstructions = require('./ChallengeInstructions');
var Chat = require('./Chat');
var AuthActions = require('../actions/AuthActions');
var AuthStore = require('../stores/AuthStore');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Home = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  displayName: 'Home',
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    AuthActions.isAuth(window.localStorage.getItem('io.codergirl'));

    return {
      user: AuthStore.getUser()
    };
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);
  },

  _onChange: function() {
    console.log("AuthStore:", AuthStore.getUser());
  },
  render: function() {
    var name = this.context.router.getCurrentPath();

    return (
      <div className="grid-block">
        <div className="medium-9 vertical grid-block">
          <div className="shorty grid-block">
            <RouteHandler/>
          </div>
          <div className="grid-block">
            <Chat/>
          </div>
        </div>
        <div className="medium-3 grid-block">
          <Leaderboard/>
        </div>
        <div className="grid-block">
        </div>
      </div>
    );
  }
});

module.exports = Home;
