import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Voter extends PureComponent {
  static propTypes = {
    score: PropTypes.number,
    vote: PropTypes.func,
  }

  downVote = (e) => { e.preventDefault() ;return this.props.vote('down') }
  upVote = (e) => { e.preventDefault() ;return this.props.vote('up') }

  render() {
    const { score } = this.props;
    return (
      <div className="post-score">
        <a href="#upVote" className="btn" title="Like this post" onClick={this.upVote}><i className="fa fa-thumbs-o-up"/></a>
        <span title="Total score">{score}</span>
        <a href="#downVote" className="btn" title="Dislike this post" onClick={this.downVote}><i className="fa fa-thumbs-o-down"/></a>
      </div>
    )
  }
}
