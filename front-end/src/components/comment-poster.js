import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Voter extends PureComponent {
  submit = () => {
    const username = this.inputAuthor.value.trim();
    const comment = this.inputComment.value.trim();
    if (username === '' || comment === '') {
      alert('Please fill in your name or comment');
      return;
    }
    this.props.postComment(comment, username);
    this.inputComment.value="";
  }
  render() {
    const { score } = this.props;
    return (
      <div className="comment-poster">
        <label>
          You are <input type="text" className="cmt-author" ref={(author) => {this.inputAuthor = author}} />
        </label>
        <label>
        <textarea className="cmt-comment" placeholder="Your comment" ref={(comment) => {this.inputComment = comment}} />
        </label>
        <button className="btn" onClick={this.submit}>Post</button>
      </div>
    )
  }
}
