import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Comment from './comment';

export default class CommentList extends PureComponent {
  static propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    comments: [],
  }

  render() {
    return (
      <div className="comment-list" id="comments">
        {this.props.comments.length === 0 && 
          <div className="empty-post-message">
          There is no comment yet for this post
        </div>} 
        {this.props.comments.map(comment => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    )
  }
}
