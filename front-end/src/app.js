import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Route, Switch, Link } from 'react-router-dom';
import Index from './pages/index';
import Category from './pages/category';
import Post from './pages/post';
import CreatePost from './pages/create-post';

import CategoryListContainer from './containers/category-list-contaner'

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="page-wrapper">
          <div className="page-side-bar">
            <div className="app-title"><Link to="/">Readable</Link></div>
            <Switch>
              <Route path="/" component={CategoryListContainer} />
            </Switch>
          </div>
          <div className="page-content">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route path="/posts/create/:category?" component={CreatePost} />
              <Route exact path="/:category" component={Category} />
              <Route path="/:category/:postId" component={Post} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
