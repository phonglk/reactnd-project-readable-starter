import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import VoterContainer from '../containers/voter-container';

export default class Comment extends PureComponent {
  static propTypes = {
    comment: PropTypes.object,
  }

  render() {
    const { comment } = this.props;
    return (
      <div className="comment-wrapper">
        <div className="comment-inner">
          <div className="comment-meta">
            <div className="comment-author">Replied by <u>{comment.author}</u></div>
            <div className="comment-date"><b>At</b> {new Date(comment.timestamp).toString()}</div>
          </div>
          <div className="comment-body">
            {<VoterContainer target={comment} type="Comment" />}
            <div className="comment-content">{comment.body}</div>
          </div>
        </div>
      </div>
    )
  }
}
