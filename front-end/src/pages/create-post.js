import React, { PureComponent } from 'react';
import CreatePostContainer from '../containers/create-post-container';

export default class CreatePost extends PureComponent {
  render() {
    const { match: { params } } = this.props;
    return <div className="page-create-post">
      <h2 style={{ marginTop: 0, paddingTop: '20px'}}>Create new post</h2>
      <CreatePostContainer category={params.category} />
    </div>
  }
}