import React, { PureComponent } from 'react';
import PostListContainer from '../containers/post-list-contaner';

export default class Index extends PureComponent {
  render() {
    return <div className="page-index">
      <PostListContainer />
    </div>
  }
}