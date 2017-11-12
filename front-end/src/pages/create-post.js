import React, { PureComponent } from 'react';
import CreatePostContainer from '../containers/create-post-container';

export default class CreatePost extends PureComponent {
  render() {
    const { match: { params } } = this.props;
    const category = params.category;
    const postId = params.postId;
    return <div className="page-create-post">
      <h2 style={{ marginTop: 0, paddingTop: '20px'}}>
        {category && "Create new post"}
        {postId && "Edit post"}
      </h2>
      <CreatePostContainer 
        category={category} 
        postId={postId}
        mode={postId ? 'edit' : 'create'}
      />
    </div>
  }
}