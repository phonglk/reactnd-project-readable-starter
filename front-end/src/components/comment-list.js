import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Comment from './comment';

export default class CommentList extends PureComponent {
  static propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
    deleteComment: PropTypes.func,
    updateComment: PropTypes.func,
  }

  static defaultProps = {
    comments: [],
  }

  render() {
    const { updateComment, deleteComment, comments} = this.props;
    return (
      <div className="comment-list" id="comments">
        {comments.length === 0 && 
          <div className="empty-post-message">
          There is no comment yet for this post
        </div>} 
        {comments.map(comment => (
          <Comment comment={comment} key={comment.id} updateComment={updateComment} deleteComment={deleteComment} />
        ))}
      </div>
    )
  }
}
