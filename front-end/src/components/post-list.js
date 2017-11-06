import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Post from './post';

export default class PostList extends PureComponent {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object),
    category: PropTypes.object,
  }

  static defaultProps = {
    posts: [],
  }

  render() {
    return (
      <div className="post-list">
        {this.props.posts.length === 0 && 
          <div className="empty-post-message">
          Sorry, there is no post for this category
        </div>} 
        {this.props.posts.map(post => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    )
  }
}
