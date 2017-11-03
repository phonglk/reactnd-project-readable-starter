import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
export default class Voter extends PureComponent {
  static propTypes = {
    score: PropTypes.number,
    postId: PropTypes.string,
  }

  render() {
    const { score } = this.props;
    return (
      <div className="post-score">
        <a href="#" className="btn" title="Like this post"><i className="fa fa-thumbs-o-up"/></a>
        <span title="Total score">{score}</span>
        <a href="#" className="btn" title="Dislike this post"><i className="fa fa-thumbs-o-down"/></a>
      </div>
    )
  }
}