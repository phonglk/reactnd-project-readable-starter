import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import VoterContainer from '../containers/voter-container';

export default class Comment extends PureComponent {
  static propTypes = {
    comment: PropTypes.object,
    deleteComment: PropTypes.func,
    updateComment: PropTypes.func,
  }

  state = {
    isEditing: false,
  }

  deleteComment = () => {
    if(window.confirm('Are you sure want to delete this comment ?')) {
      this.props.deleteComment(this.props.comment);
    }
  }

  editComment = () => {
    this.setState({ isEditing: true }, () => {
      this.editInput.focus();
    })
  }

  completeEdit = () => {
    const comment = this.editInput.value.trim();
    if (comment === '') {
      alert('Comment cannot be blank');
      return;
    }
    this.props.updateComment({
      ...this.props.comment,
      body: comment,
    });
    this.setState({ isEditing: false });
  }

  cancelEdit = () => {
    this.setState({ isEditing: false });
  }

  render() {
    const { comment } = this.props;
    const { isEditing } = this.state;
    return (
      <div className="comment-wrapper">
        <div className="comment-inner">
          <div className="comment-meta">
            <div className="comment-author">Replied by <u>{comment.author}</u></div>
            <div className="comment-date"><b>At</b> {new Date(comment.timestamp).toString()}</div>
          </div>
          {isEditing ? (
            <div className="comment-edit">
              <textarea ref={ta => this.editInput = ta }>{comment.body}</textarea>
              <div>
                <button className="btn" title="Edit Comment" onClick={this.completeEdit}>
                  Update
                </button>
                <button className="btn" title="Edit Comment" onClick={this.cancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          ): (
            <div className="comment-body">
              <VoterContainer target={comment} type="Comment" />
              <div className="comment-content">{comment.body}</div>
              <div className="comment-actions">
                <button className="btn" title="Edit Comment" onClick={this.editComment}>
                  <i className="fa fa-pencil"/>
                </button>
                <button className="btn" title="Delete Comment" onClick={this.deleteComment}>
                  <i className="fa fa-trash"/>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
