import React, { PureComponent } from 'react';
import PostDetailContainer from '../containers/post-detail-container';
import ComentSectionContainer from '../containers/comment-section-container';
// TODO: CRUD Comment/Post
export default class Post extends PureComponent {
  render() {
    const { match: { params: { postId } } } = this.props;
    return <div className="page-post">
      <PostDetailContainer postId={postId} />
      <ComentSectionContainer postId={postId} />
    </div>
  }
}