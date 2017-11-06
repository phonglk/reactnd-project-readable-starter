import React, { PureComponent } from 'react';
import PostListContainer from '../containers/post-list-contaner';

export default class Category extends PureComponent {
  render() {
    const { match: { params: { category } } } = this.props;
    return <div className="page-category">
      <PostListContainer category={category} />
    </div>
  }
}