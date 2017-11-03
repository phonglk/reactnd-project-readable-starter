import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import Index from '../pages/index';
import Category from '../pages/category';
import Post from '../pages/post';

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/category" component={Category} />
          <Route path="/post" component={Post} />
        </Switch>
      </div>
    );
  }
}

export default App;
