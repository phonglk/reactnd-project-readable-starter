import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postVote } from '../actions';

class Voter extends PureComponent {
  static propTypes = {
    score: PropTypes.number,
    postId: PropTypes.string,
  }

  vote = (option) => {
    this.props.dispatch(postVote(this.props.postId, option));
  }
  downVote = () => { this.vote('down') }
  upVote = () => { this.vote('up') }

  render() {
    const { score } = this.props;
    return (
      <div className="post-score">
        <a href="#" className="btn" title="Like this post" onClick={this.upVote}><i className="fa fa-thumbs-o-up"/></a>
        <span title="Total score">{score}</span>
        <a href="#" className="btn" title="Dislike this post" onClick={this.downVote}><i className="fa fa-thumbs-o-down"/></a>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps;
  return {
    score: state.posts.post[postId].voteScore,
    postId,
  }
}

export default connect(mapStateToProps)(Voter);
